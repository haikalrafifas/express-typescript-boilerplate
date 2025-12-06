import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookie from 'cookie-parser';
import multer from 'multer';

import corsOptions from '@/config/cors';
import language from '@/middlewares/language';
import apiResponse from '@/middlewares/response';
import docs from '@/middlewares/docs';
import routeHandler from '@/middlewares/route-handler';
import errorHandler from '@/middlewares/error-handler';
import { log } from '@/utilities/logger';

const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(language);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use(apiResponse);
app.use(docs);
app.use(routeHandler);
app.use(errorHandler);

app.listen(port, () => log(`Server is running on port ${port}`));

export default app;
