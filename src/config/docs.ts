import { Options } from 'swagger-jsdoc';

const swaggerDefinition: Options['swaggerDefinition'] = {
  openapi: '3.0.0',
  info: {
    title: 'Express TypeScript Boilerplate API',
    version: '1.0.0',
    description: 'A sample API built with Express and TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server v1',
    },
    {
      url: 'http://localhost:3000/api/v2',
      description: 'Development server v2',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
        required: ['name', 'email'],
      },
      // Define other schemas here
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ['./src/domains/v1/**/*/route.ts', './src/domains/v2/**/*/route.ts'],
};

export default options;
