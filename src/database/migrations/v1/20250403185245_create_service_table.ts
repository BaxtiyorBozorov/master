import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('services' ,  table => {
    table.increments('id').primary()
    table.integer('master_id').references('users.id').onDelete('CASCADE') //master id aslida user id 
    table.integer('category_id').references('categories.id').onDelete('CASCADE')
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.integer('price').notNullable()
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('services')
}

