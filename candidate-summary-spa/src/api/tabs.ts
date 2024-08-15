import { queryOptions } from '@tanstack/react-query';
import { Tab } from '../types/types';

export function tabsQuery() {
	return queryOptions<Tab[]>({
		queryKey: ['tabs'],
		queryFn: async () => {
			const response = await fetch('/proxy/recruit/tabs');
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	});
}
