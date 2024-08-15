import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from '@icims-design-system/i18next';
import { ThemeProvider } from '@icims-design-system/mui-core';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

import { createRouter } from '@/routes';
import { pendoScript } from './util/pendo';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 2
		}
	}
});

const router = createRouter(queryClient);

pendoScript();

function App() {
	return (
		<I18nextProvider i18n={i18nextConfig({ ns: ['common'] })}>
			<ThemeProvider variant="light">
				<React.Suspense fallback={<CircularProgress />}>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</React.Suspense>
			</ThemeProvider>
		</I18nextProvider>
	)
}

export default App;
