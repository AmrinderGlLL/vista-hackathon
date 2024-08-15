import { HttpResponse, delay, http, RequestHandler } from 'msw';

const DELAY = 2000;

const mockCandidateData = {
	address: [
			{
					countryCode: 'USA',
					formattedAddress: 'Asbury Park, NJ, US',
					isPrimary: true,
					label: 'home address',
					type: 'HOME'
			}
	],
	email: [
			{
					address: 'brian.farley@cand.icims.com',
					isPrimary: true,
					label: 'work email address',
					type: 'WORK'
			}
	],
	id: '1',
	name: {
			displayName: 'Brian Farley',
			givenName: 'Brian',
			surname: 'Farley'
	},
	org: 'Regeneron Pharmaceuticals, Inc.',
	phone: [
			{
					countryCode: '+1',
					extensionNumber: '10',
					isPrimary: true,
					nationalNumber: '7777777777',
					type: 'MOBILE'
			}
	],
	resumeData: {
			city: 'Asbury Park',
			country: 'US',
			education_degree_1: 'Bachelor of Science',
			education_major_1: 'Biology',
			education_school_1: 'Rutgers University',
			email: 'brian.farley@cand.icims.com',
			first_name: 'Brian',
			gender: 'male',
			highest_education: 'bachelors',
			id: 1,
			last_name: 'Farley',
			skills: 'biotechnology, lab equipment, data analysis, data collection, medical research, problem solving, results diven, r programming, matlab',
			state: 'NJ',
			total_months_work_experience: 157,
			total_years_work_experience: 13.0,
			work_history_1_description: "Professional Experience        Research Analyst,  -------\\n* Conduct biotech research, compile data, and uncover insights. Regularly\\n    present findings to executive leadership.\\n    * Operate advanced proprietary software used daily.\\n    * Assisted with writing a secondary patent for the organization's own software\\n    program",
			work_history_1_employer: 'Regeneron Pharmaceuticals, Inc.',
			work_history_1_end_date: null,
			work_history_1_start_date: 'None',
			work_history_1_title: 'Research Analyst',
			work_history_2_description: 'Amgen, Inc.\\n-------\\n*    Assisted in conducting pharmaceutical research with biotechnology team.\\n    *    Qualified and validated new lab instruments for all Amgen labs.\\n    *    Performed pH gradient experiments and produced extensive charting and\\n    graphing. \\n    *    Presented various findings and ultimately was able to implement certain\\n    findings into our technology.',
			work_history_2_employer: 'Amgen, Inc.',
			work_history_2_end_date: '2007-05-01T00:00:00Z',
			work_history_2_start_date: 'None',
			work_history_2_title: 'Biotech Researcher'
	},
	title: 'Research Analyst',
	url: [
			{
					address: 'https://www.linkedin.com/in/brian-72381ujy3u',
					isPrimary: true,
					type: 'LINKEDIN'
			}
	]
};

const handlers: RequestHandler[] = [
	http.get('/candidate/:candidateId', async (req) => {
		if (process.env.NODE_ENV !== 'test') {
			await delay(DELAY);
		}

		if (req.params.candidateId === '1') {
			return HttpResponse.json(mockCandidateData);
		}
	
		return HttpResponse.json({ error: 'unsupported mock candidate id' }, { status: 404 });
	}),
	http.get('/profile_summary/:candidateId', async (req) => {
		if (process.env.NODE_ENV !== 'test') {
			await delay(4000);
		}

		if (req.params.candidateId === '1') {
			return HttpResponse.json('Karen Jones is a dedicated Account Director with over 12 years of experience in the financial services industry. She holds a Masters degree in Business from Harvard and has extensive management experience including 7 years in executive and middle management roles. Karen’s key skills include spreadsheets, auditing, financial control and reporting. She has proven success increasing office efficiency and reducing labor costs by 5% through implementing new project management software. Karen also developed the organization’s first financial controls and reporting system. Her work history highlights her strengths in budget management, financial analysis, training and leadership. Karen would bring strong financial acumen and management capabilities to a Senior Accounting or Finance leadership role.');
		}

		return HttpResponse.json({ error: 'unsupported mock candidate id' }, { status: 404 });
	})
];

export { handlers };


// Professional Summary:\n\nBrian Farley is an accomplished Research Analyst with over 13 years of experience in the biotech and pharmaceuticals industry. Currently employed at Regeneron Pharmaceuticals, Inc., he conducts innovative biotech research, compiles comprehensive data, and uncovers key insights to support executive decision-making. Brian’s strong technical skills include proficiency in operating advanced proprietary software and contributing to the development of a secondary patent for the company’s software program.\n\nPrior to his current role, Brian served as a Biotech Researcher at Amgen, Inc. where he assisted with pharmaceutical research, qualified and validated new lab instruments, and presented findings that were successfully implemented into the organization’s technology. \n\nKey Skills and Achievements:\n- Proficient in biotechnology, lab equipment, data analysis, and problem-solving\n- Experienced in conducting biotech research, compiling data, and presenting insights to leadership\n- Contributed to the development of a secondary patent for the company’s proprietary software\n- Assisted with pharmaceutical research, lab instrument validation, and implementation of research findings at previous employer
