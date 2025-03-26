import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.string('phone').nullable().defaultTo(null)
    table.string('email').nullable().defaultTo(null)
    table.string('password').nullable().defaultTo(null)
    table.string('role').nullable().defaultTo(null)
    table.string('avatar').nullable().defaultTo(null)
    table.timestamps(true, true)
  })
}



export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

