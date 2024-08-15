import { queryOptions } from '@tanstack/react-query';
import { AnalyticInfo } from '../types/types';

export function analyticInfoQuery() {
	return queryOptions<AnalyticInfo>({
		queryKey: ['analyticInfo'],
		queryFn: async () => {
			const response = await fetch('/proxy/recruit/analytic/info');
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	});
}
