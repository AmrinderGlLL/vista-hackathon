import pandas as pd
import sqlite3

# Read the CSV file into a pandas DataFrame
df = pd.read_csv('../data/candidates.csv')

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('vista_hackathon_2024.db')

# Load the DataFrame into the SQLite table
df.to_sql('candidate', conn, if_exists='replace', index=False)

# Commit the transaction and close the connection
conn.commit()
conn.close()

print(f"Data loaded successfully into {'candidate'} table!")