import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

void (
	async () => {
		if (import.meta.env.VITE_MOCKS === 'true') {
			const devServer = await import(
				/* webpackChunkName: "dev-server" */
				'./test-utils/dev-server'
			);
			void devServer.start();
		}

		return ReactDOM.createRoot(document.getElementById('root')!).render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
		);
	})();
