import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('masters', table => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id').onDelete('CASCADE')
    table.integer('category_id').references('categories.id').onDelete('CASCADE')
    table.smallint('experience').nullable().defaultTo(null)
    table.smallint('rating').nullable().defaultTo(null)
    table.integer('min_price').nullable().defaultTo(null)
    table.integer('max_price').nullable().defaultTo(null)
    table.string('address').nullable().defaultTo(null)
    table.decimal('latitude', 9, 6).nullable().defaultTo(null)
    table.decimal('longitude', 9, 6).nullable().defaultTo(null)
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('masters')
}

