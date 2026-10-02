import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './docs/openapi.js';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.get(
  '/api-docs',
  swaggerUi.setup(openApiSpec, {
    customSiteTitle: 'FleetFlow Logistics API',
    swaggerOptions: {
      docExpansion: 'list',
      displayRequestDuration: true,
    },
  }),
);
app.get('/api-docs.json', (_request, response) => {
  response.status(200).json(openApiSpec);
});

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

export default app;
