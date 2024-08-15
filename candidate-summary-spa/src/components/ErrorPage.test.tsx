import { render, screen } from 'test-utils';
import { useRouteError, ErrorResponse, isRouteErrorResponse } from 'react-router-dom';

import ErrorPage from './ErrorPage';

vi.mock('react-router-dom', async (importOriginal) => {
	return {
		...await importOriginal<typeof import('react-router-dom')>(),
		isRouteErrorResponse: vi.fn(),
		useRouteError: vi.fn()
	};
});

it('renders route error response', () => {
	vi.mocked(useRouteError).mockReturnValue({ status: 500, statusText: 'Error Test', data: {} } as ErrorResponse);
	vi.mocked(isRouteErrorResponse).mockReturnValue(true);

	render(<ErrorPage />);

	expect(screen.getByText('error')).toBeInTheDocument();
	expect(screen.getByText('Error Test')).toBeInTheDocument();
});

it('renders generic error', () => {
	vi.mocked(useRouteError).mockReturnValue({});
	vi.mocked(isRouteErrorResponse).mockReturnValue(false);

	render(<ErrorPage />);

	expect(screen.getByText('error')).toBeInTheDocument();
	expect(screen.getByText('errorCodes.0')).toBeInTheDocument();
});
