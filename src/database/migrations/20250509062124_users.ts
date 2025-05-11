import type { Knex } from 'knex';

const enums = {
  role: 'users_role',
};

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', table => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('remember_token', 512);
      table.enum('role', ['member', 'admin'], { useNative: true, enumName: enums.role }).defaultTo('member');
      table.timestamp('email_verified_at');
      table.timestamp('last_email_sent_at');
      table.timestamps(true, true);
      table.timestamp('deleted_at');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');

  await Promise.all(
    Object.values(enums).map(typeName =>
      knex.schema.raw(`DROP TYPE IF EXISTS "${typeName}"`)
    )
  );
}
