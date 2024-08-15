import '@testing-library/jest-dom/vitest';
import { setGlobalOrigin } from 'undici';

import { server } from '@/test-utils/server';

beforeAll(() => server.listen());

beforeEach(() => {
	setGlobalOrigin(window.location.href);
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
