import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('User', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('handle').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('Post', (table) => {
    table.increments('id').primary();
    table.string('body').notNullable();
    table.integer('author_id').references('id').inTable('User').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Post');
  await knex.schema.dropTable('User');
}
