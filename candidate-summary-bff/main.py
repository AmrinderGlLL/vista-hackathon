
from flask import Flask, request, jsonify
import boto3
import sqlite3
from langchain_aws import ChatBedrock
from langchain_core.prompts import (
    ChatPromptTemplate,
    FewShotChatMessagePromptTemplate,
    PromptTemplate
)
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import BedrockEmbeddings
from langchain_community.document_loaders import CSVLoader
from langchain_text_splitters import RecursiveJsonSplitter
from langchain_experimental.text_splitter import SemanticChunker
from langchain_community.document_loaders import JSONLoader
import langchain
langchain.debug=True
from langchain_text_splitters import CharacterTextSplitter
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all domains on all routes
CORS(app)

# Create clients 
client = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1",
    aws_access_key_id = "ASIA54ECZY3MSX5MDCWN",
    aws_secret_access_key = "Wwc5l42ioRUZYhJYVbVRNslV3aQpgjRXnJESUM9w",
    aws_session_token = "IQoJb3JpZ2luX2VjEL///////////wEaCXVzLWVhc3QtMSJHMEUCIQCVTxTMA670tNHgYKkndpwYaandXiDcqpvX3p1PtZQftQIgfDZwlgjsKeHEaBVMqXy928TJIOP/4aug5VYKwCwIu4YqkwMImP//////////ARAAGgw5NTM3NTcwNTg3NzciDDjr5Z9BeX9H6PuxKCrnAsqXsvWJiLbzbcyisOY3bhScLrwKbfTc1wfZkeHDX0t2yxgzHNDjfbMLmY7y3dD1+JmUH4GKKFE2nshaoxmQwEfkP2GL7CKKdSW1V2s8UClycVhj6hEV/nEKkxQ3ULJ8PSWGMnlhJ+9r3db0vo2xaPQiNCy3pUZkxue9NtC4BFzLr7UVwsnF/zd4MYNokoDKtw8BJpY4xguVLVP0PKJqtTXtTG17I1OuT7mpG4KjHs1RvDWKZOCvE8dXde3KiQRA8SfnD4/WsON5xYA2t1t60491CQUugxdAIAnpBXp2LMZi77v5TNhe2LrW1Vub4luahyoP4CDa/M9wHuV2g+FqDHb8Q4IGKNXdmr8TWdvc647rDWu1/y50zSHdneTpkRQiEOzZOxM2V2P4ibBwcs65u93cByD3tuUZntcmKf5KiydS91I2IEW8u4pVvuCJRkTU4XR19s6L5HGvpAUQSHIpz56OWTPF4tU5MOvfgLUGOqYBZKh3ZMaIGnIYJaRu0At4u5GdVKzCkJkeO28Yxf+9INW4+FCA06kFk6BEadOy0Or7ozz9A+lz3AKEpfK9QesBFALMOZX4t4hiS0+2KhVii9f0Zo3LJha7pfQ8PjC8wh9kiT2guuaayc7nwZSScDFPEILB8UivCf/vjGI/ObIju1d9vh482wFg+6Yd04pVu+1o2zPpAlIz1TqB+jD+cO+Mygqd6KN1aw=="
)
embeddings = BedrockEmbeddings(client=client, model_id="amazon.titan-embed-text-v1")
llm = ChatBedrock(client=client, model_id="anthropic.claude-3-haiku-20240307-v1:0", verbose=True)

# Load data for the RAG
loader = JSONLoader(
    file_path='./data/example_summaries.json',
    jq_schema='.examples[]',
    text_content=False)
data = loader.load()
text_splitter = SemanticChunker(embeddings)
splitter = RecursiveJsonSplitter()
db = FAISS.from_documents(text_splitter.split_documents(data), embeddings)
# db.save_local(folder_path="./db/faiss_db", index_name="myFaissIndex")

final_prompt = PromptTemplate.from_template("""
system: You are a helpful assistant. Create an objective professional summary from the following current candidate profile data, highlighting top skills and achievements in bullet points. Add employment context to any achievements listed. Prioritize latest employment history. Please avoid "fluffy" writing. Please be very accurate. The summary should be concise, under 300 words. DO NOT REPEAT THE INSTRUCTIONS.
Example Profiles:
{few_shot_prompt}

Current Candidate Profile:
{context}

human: generate profiled summary 
ai: Professional Summary:
[User]...
"""
)

final_chat_prompt = PromptTemplate.from_template("""
system: You are a helpful assistant. Give detailed a overview with bullet points for the following current candidate data, focusing only on "{area}". Please avoid "fluffy" writing. Please be very accurate. The summary should be concise, under 300 words. DO NOT REPEAT THE INSTRUCTIONS.
Example Summary:
{few_shot_prompt}

Current Candidate Profile:
{context}

human: generate {area} summary
ai:
"""
)

# Generate Summary
@app.route('/profile_summary/<int:candidate_id>', methods=['GET'])
def profile_summary(candidate_id):
    candidate = get_candidate(candidate_id).get_json()
    candidate_string = splitter.split_text(json_data=candidate)
    top_examples = db.similarity_search(candidate['title'], k=5)
    top_examples = [example.page_content for example in top_examples]
    chain = final_prompt | llm
    return jsonify(chain.invoke({"context": candidate_string, "few_shot_prompt": top_examples}).content)

# Generate Chat
@app.route('/chat/<int:candidate_id>/<string:area>', methods=['GET'])
def chat(candidate_id, area):
    candidate = get_candidate(candidate_id).get_json()
    candidate_string = splitter.split_text(json_data=candidate)
    top_examples = db.similarity_search(candidate['title'], k=2)
    top_examples = [example.page_content for example in top_examples]
    chain = final_chat_prompt | llm
    return jsonify(chain.invoke({"area": area, "context": candidate_string, "few_shot_prompt": top_examples}).content)

# Test RAG similarity search
@app.route('/rag', methods=['GET'])
def similarity_search():
    query = request.args.get('query')
    docs = db.similarity_search(query, k=1)
    print(docs)
    return [{"page_content": doc.page_content, "metadata": doc.metadata} for doc in docs]

# get all candidates
@app.route('/candidates') 
def get_candidates():

    # Connect to the SQLite database
    conn = sqlite3.connect('db/vista_hackathon_2024.db')

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # Execute a query to fetch all rows from the table
    cursor.execute("SELECT id, email, first_name, last_name FROM candidate")
    rows = cursor.fetchall()

    # Get column names
    column_names = [description[0] for description in cursor.description]

    # Convert rows to a list of dictionaries
    candidates = [dict(zip(column_names, row)) for row in rows]
    
    # Close the connection
    conn.close()

    return jsonify(candidates)

@app.route('/candidate/<int:candidate_id>', methods=['GET'])
def get_candidate(candidate_id):
    # Connect to the SQLite database
    conn = sqlite3.connect('db/vista_hackathon_2024.db')

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # Execute a query to fetch the full profile for the given ID
    cursor.execute("SELECT * FROM candidate WHERE ID = ?", (candidate_id,))
    row = cursor.fetchone()

    # Check if a candidate was found
    if row is None:
        # Close the connection
        conn.close()
        return jsonify({'error': 'Candidate not found'}), 404

    # Get column names
    column_names = [description[0] for description in cursor.description]

    # Convert the row to a dictionary
    candidate_data = dict(zip(column_names, row))

    # format data for FE
    candidate = {
        "id": str(candidate_data["id"]),
        "name": {
            "givenName": candidate_data["first_name"],
            "surname": candidate_data["last_name"],
            "displayName": f"{candidate_data['first_name']} {candidate_data['last_name']}"
        },
        "title": candidate_data["work_history_1_title"],
        "org": candidate_data["work_history_1_employer"],
        "email":[
            {
                "type":"WORK",
                "address":candidate_data["email"],
                "label":"work email address",
                "isPrimary":True
            }
        ],
        "phone": [
            {
                "type": "MOBILE",
                "countryCode": "+1",
                "nationalNumber": str(candidate_data["mobile"]),
                "extensionNumber": "10",
                "isPrimary": True
            }
        ],
        "address": [
            {
                "type": "HOME",
                "formattedAddress": candidate_data["city"],
                "countryCode": "USA",
                "label": "home address",
                "isPrimary": True
            }
        ],
        "url": [
            {
                "type": "LINKEDIN",
                "address": candidate_data["linkedin_url"],
                "isPrimary": True
            }
        ],
        "resumeData": {
            "city": candidate_data["city"],
            "country": candidate_data["country"],
            "education_degree_1": candidate_data["education_degree_1"],
            "education_major_1": candidate_data["education_major_1"],
            "education_school_1": candidate_data["education_school_1"],
            "email": candidate_data["email"],
            "first_name": candidate_data["first_name"],
            "gender": candidate_data["gender"],
            "highest_education": candidate_data["highest_education"],
            "id": candidate_data["id"],
            "last_name": candidate_data["last_name"],
            "skills": candidate_data["skills"],
            "state": candidate_data["state"],
            "total_months_work_experience": candidate_data["total_months_work_experience"],
            "total_years_work_experience": candidate_data["total_years_work_experience"],
            "work_history_1_start_date": candidate_data.get("work_history_1_start_date"),
            "work_history_1_description": candidate_data["work_history_1_description"],
            "work_history_1_employer": candidate_data["work_history_1_employer"],
            "work_history_1_end_date": candidate_data["work_history_1_end_date"],
            "work_history_1_title": candidate_data["work_history_1_title"],
            "work_history_2_start_date": candidate_data.get("work_history_2_start_date"),
            "work_history_2_description": candidate_data["work_history_2_description"],
            "work_history_2_employer": candidate_data["work_history_2_employer"],
            "work_history_2_end_date": candidate_data["work_history_2_end_date"],
            "work_history_2_title": candidate_data["work_history_2_title"]
        }
    }

    return jsonify(candidate)