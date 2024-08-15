import { setupWorker, StartOptions } from 'msw/browser';
import { handlers } from './server-handlers';

const server = setupWorker(...handlers);

export const start = (options?: StartOptions): Promise<ServiceWorkerRegistration | undefined> => {
	return server.start(options);
};
