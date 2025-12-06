/**
 * Cross-Origin Resource Sharing configuration
 */
const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';

const corsConfig = {
  origin: allowedOrigins === '*' ? true : allowedOrigins.split(','),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: allowedOrigins !== '*',
};

export default corsConfig;
