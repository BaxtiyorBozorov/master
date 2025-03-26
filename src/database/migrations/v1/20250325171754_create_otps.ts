import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('otps', table => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('otp').notNullable()
    table.integer('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('otps')
}

