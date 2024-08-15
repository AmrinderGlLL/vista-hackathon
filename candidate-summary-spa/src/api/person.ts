import { queryOptions } from '@tanstack/react-query';
import { Person } from '../types/types';

export function personQuery(personId: string) {
	return queryOptions<Person>({
		queryKey: ['person', personId],
		queryFn: async () => {
			const mocks = import.meta.env.VITE_MOCKS === 'true';
			
			const baseUrl = mocks ? '' : 'http://127.0.0.1:5000';

			const response = await fetch(`${baseUrl}/candidate/${personId}`);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	});
}
