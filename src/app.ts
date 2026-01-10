import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import multer from 'multer';

import corsOptions from './config/cors.js';
import language from './middlewares/language.js';
import apiResponse from './middlewares/response.js';
import docs from './middlewares/docs.js';
// import apiRoutes from './middlewares/route-mounter.js';
import registerRoute from './middlewares/route-registrar.js';
import apiRoutes from './config/routes.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();
const upload = multer();

app.use(cors(corsOptions));
app.use(language);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use(apiResponse);
app.use(docs);
// app.use(apiRoutes);
app.use(registerRoute(apiRoutes));
app.use(errorHandler);

export default app;
