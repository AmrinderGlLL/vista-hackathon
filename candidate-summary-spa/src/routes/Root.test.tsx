import { HttpResponse, http, renderWithRouter, screen, server, waitFor } from 'test-utils';
import { initPendo } from '@/util/pendo';

vi.mock('@/util/pendo', async (importOriginal) => ({
	...await importOriginal<typeof import('@/util/pendo')>(),
	initPendo: vi.fn(),
}));

it('renders the root page, initializes pendo, and redirects to default tab', async () => {
	renderWithRouter();

	await waitFor(() => expect(initPendo).toHaveBeenCalledTimes(1));
	await waitFor(() => expect(window.location.pathname).toBe('/tab/1'));

	expect(await screen.findByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
	expect(await screen.findByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
	expect(await screen.findByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
});

it('renders error page when analytic info api fails', async () => {
	console.error = vi.fn();
	server.use(
		http.get('/proxy/recruit/analytic/info', () => {
			return new HttpResponse('Internal Server Error', { status: 500 });
		})
	);

	renderWithRouter();

	expect(await screen.findByText('error')).toBeInTheDocument();
	expect(await screen.findByText('errorCodes.0')).toBeInTheDocument();
});

it('renders error page when tabs api fails', async () => {
	console.error = vi.fn();
	server.use(
		http.get('/proxy/recruit/tabs', () => {
			return new HttpResponse('Internal Server Error', { status: 500 });
		})
	);

	renderWithRouter();

	expect(await screen.findByText('error')).toBeInTheDocument();
	expect(await screen.findByText('errorCodes.0')).toBeInTheDocument();
});
