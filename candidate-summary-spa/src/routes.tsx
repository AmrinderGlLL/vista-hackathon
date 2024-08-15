import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@/components/ErrorPage';

export const createRouter = (queryClient: QueryClient) => createBrowserRouter(
	[
		{
			path: '/',
			async lazy() {
				const Root = await import('@/routes/Root');

				return { Component: Root.default, loader: Root.default.loader(queryClient) };
			},
			errorElement: <ErrorPage />,
			children: [
				{
					path: 'person/:candidateId',
					async lazy() {
						const GlobalProfile = await import('@/routes/GlobalProfile');

						return { Component: GlobalProfile.default };
					},
				},
				{
					path: 'submittal/:submittalId/candidate/:candidateId',
					async lazy() {
						const SubmittalProfile = await import('@/routes/SubmittalProfile');

						return { Component: SubmittalProfile.default };
					}
				}
			]
		}
	]
);
