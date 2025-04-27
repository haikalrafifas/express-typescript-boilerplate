require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('@/routes');
const corsOptions = require('@/config/cors');
const logger = require('@/utilities/logger');
const responseMiddleware = require('@/middlewares/response-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);
app.use('/api/v1', apiRoutes);

app.listen(port, logger.log(`Server is running on port ${port}`));

export default app;
