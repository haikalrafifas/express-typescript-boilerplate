/**
 * Database configuration
 */
import dotenv from 'dotenv';
import { join } from 'path';

const envPath = join(
  process.cwd(),
  '.env' + (process.env.NODE_ENV === 'test' ? '.test' : ''),
);

dotenv.config({ path: envPath });

import type { Knex } from 'knex';

const config: Knex.Config = {
  client: process.env.DATABASE_DRIVER || 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'myapp',
  },
  searchPath: process.env.DATABASE_SCHEMA?.split(',') || ['public'],
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeders',
  },
  // For MySQL
  ...(process.env.DATABASE_DRIVER === 'mysql2' && {
    useNullAsDefault: true,
  }),
};

export default config;
