import type { JsonObject } from 'swagger-ui-express';

export const openApiSpec: JsonObject = {
  openapi: '3.0.3',
  info: {
    title: 'FleetFlow Logistics API',
    version: '0.1.0',
    description: 'API do FleetFlow Logistics OS.',
  },
  servers: [
    {
      url: '/',
      description: 'Servidor atual da API',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Verificação de disponibilidade da API',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica se a API está disponível',
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'A API está disponível.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['ok'],
                      example: 'ok',
                    },
                  },
                },
                example: {
                  status: 'ok',
                },
              },
            },
          },
        },
      },
    },
  },
};
