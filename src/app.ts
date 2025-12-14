import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import multer from 'multer';

import corsOptions from './config/cors';
import language from './middlewares/language';
import apiResponse from './middlewares/response';
import docs from './middlewares/docs';
// import registerRoute from './middlewares/route-registrar';
// import apiRoutes from './config/routes';
import errorHandler from './middlewares/error-handler';
import apiRoutes from './middlewares/route-mounter';

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
app.use(apiRoutes);
// app.use(registerRoute(apiRoutes));
app.use(errorHandler);

export default app;
