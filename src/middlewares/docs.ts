import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from '../config/docs';

const DOCS_PATH = '/api-docs';

const router = express.Router();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI routes
router.use(DOCS_PATH, swaggerUi.serve);
router.get(DOCS_PATH, swaggerUi.setup(swaggerSpec));

export default router;
