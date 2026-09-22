import { type SetupServer, setupServer } from 'msw/node';
import { handlers } from './handlers.ts';

export const server: SetupServer = setupServer(...handlers);
