import { queryOptions } from '@tanstack/react-query';
import { Summary } from '../types/types';

export function summaryQuery(candidateId: string) {
	return queryOptions<Summary>({
		queryKey: ['summary', candidateId],
		queryFn: async () => {
			const mocks = import.meta.env.VITE_MOCKS === 'true';
			
			const baseUrl = mocks ? '' : 'http://127.0.0.1:5000';

			const response = await fetch(`${baseUrl}/profile_summary/${candidateId}`);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	});
}
