/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from 'react';
import type { RenderHookOptions, RenderHookResult, RenderOptions } from '@testing-library/react';
import { act, render, renderHook } from '@testing-library/react';
import { ThemeProvider } from '@icims-design-system/mui-core';
import i18nextConfig from '@icims-design-system/i18next';
import { I18nextProvider } from 'react-i18next';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import mediaQuery from 'css-mediaquery';
import { createRouter } from '../routes';
import { RouterProvider } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };

type CustomRenderHook = <TProps, TResult>(callback: (props: TProps) => TResult, options?: RenderHookOptions<TProps>) => RenderHookResult<TResult, TProps>;

const i18nConfig: Record<string, unknown> = {
	lng: 'en',
	fallbackLng: 'en',
	ns: ['common'],
	defaultNS: 'common',
	debug: false,
	interpolation: {
		escapeValue: false
	},
	resources: { en: { common: {} } }
};

if (process.env.NODE_ENV === 'test') {
	i18nConfig.backend = { cdn: false };
}

const i18n = i18nextConfig(i18nConfig);

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } } });

const AllTheProviders = ({ children, queryClient: incomingQueryClient }: { children?: ReactNode, queryClient?: QueryClient }) => {
	const queryClient = incomingQueryClient ?? createQueryClient();

	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider variant="light">
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</ThemeProvider>
		</I18nextProvider>
	);
};

const AllTheProvidersWithRouter = () => {
	const queryClient = createQueryClient();
	const router = createRouter(queryClient);

	return (
		<AllTheProviders queryClient={queryClient}>
			<RouterProvider router={router} />
		</AllTheProviders>
	);
};

type RenderWithRouterOptions = Omit<RenderOptions, 'wrapper'> & { route?: string };

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => ({
	user: userEvent.setup(),
	...render(ui, { wrapper: AllTheProviders, ...options })
});

const renderWithRouter = (
	options?: RenderWithRouterOptions,
) => {
	window.history.pushState({}, 'Test page', options?.route ?? '/');

	return {
		user: userEvent.setup(),
		...render(null, { wrapper: AllTheProvidersWithRouter, ...options })
	}
};

const customRenderHook: CustomRenderHook = (callback, options) => renderHook(callback, { wrapper: AllTheProviders, ...options });

const createMatchMedia = (width: number) => (query: string): MediaQueryList => ({
	matches: mediaQuery.match(query, { width }),
	addListener: noop,
	removeListener: noop,
	addEventListener: noop,
	removeEventListener: noop,
	dispatchEvent: () => true,
	media: '',
	onchange: noop,
});

export const setScreenWidth = (width: number) => {
	act(() => {
		window.matchMedia = createMatchMedia(width);
	});
};

export * from '@testing-library/react';
export { customRender as render, renderWithRouter, userEvent, customRenderHook as renderHook };
export * from './server';
