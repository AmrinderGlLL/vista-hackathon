import { renderWithRouter, screen, waitFor } from 'test-utils';

it('renders the selected tab', async () => {
	const { user } = renderWithRouter();

	await waitFor(() => expect(window.location.pathname).toBe('/tab/1'));

	expect(await screen.findByText('Tab 1 Content')).toBeInTheDocument();

	await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

	await waitFor(() => expect(window.location.pathname).toBe('/tab/2'));

	expect(await screen.findByText('Tab 2 Content')).toBeInTheDocument();

	await user.click(screen.getByRole('tab', { name: 'Tab 3' }));

	await waitFor(() => expect(window.location.pathname).toBe('/tab/3'));

	expect(await screen.findByText('Tab 3 Content')).toBeInTheDocument();

	expect(window.history.length).toBe(4);
});
