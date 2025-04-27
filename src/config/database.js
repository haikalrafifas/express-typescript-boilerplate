require('dotenv').config();

module.exports = {
  client: process.env.DATABASE_DRIVER || 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: process.env.DATABASE_SCHEMA?.split(',') || ['public'],
  migrations: {
    directory: __dirname + '/../database/migrations',
  },
  seeds: {
    directory: __dirname + '/../database/seeders',
  },
};
