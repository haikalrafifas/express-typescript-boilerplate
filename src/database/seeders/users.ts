import { Knex } from 'knex';
import * as crypto from '../../utilities/string/crypto.js';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Administrator',
      email: 'admin@example.com',
      password: await crypto.hash('admin123'),
      role: 'admin',
    },
    {
      name: 'Member',
      email: 'member@example.com',
      password: await crypto.hash('member123'),
    },
  ]);
}
