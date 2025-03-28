import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('masters', table => {
    table.dropColumn('rating')
    table.integer('rating_count').nullable().defaultTo(null)
    table.integer('rating_sum').nullable().defaultTo(null)
    table.float('rating_avg').nullable().defaultTo(null)
  } )
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('masters', table => {
    table.dropColumn('rating_count')
    table.dropColumn('rating_sum')
    table.dropColumn('rating_avg')
    table.smallint('rating').nullable().defaultTo(null)
  })
}

