import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server.ts';

beforeAll((): void => server.listen({ onUnhandledRequest: 'error' }));

afterEach((): void => server.resetHandlers());

afterAll((): void => server.close());
