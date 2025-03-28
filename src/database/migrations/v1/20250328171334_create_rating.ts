import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ratings', table => {
    table.increments('id').primary()
    table.integer('master_id').references('masters.id').onDelete('CASCADE')
    table.integer('user_id').references('users.id').onDelete('CASCADE')
    table.smallint('rating').notNullable()
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ratings')
}

