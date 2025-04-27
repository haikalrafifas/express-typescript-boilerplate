require('dotenv').config();

const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';

module.exports = {
  origin: allowedOrigins.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
};
