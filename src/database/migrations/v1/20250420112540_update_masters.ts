import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('masters', table => {
    table.dropColumn('category_id');
    table.string('category_id').references('categories.id').onDelete('CASCADE');
  }
  );
  await knex.schema.alterTable('users', table => {  
    table.dropColumn('role');
    table.string('role').references('roles.id').onDelete('CASCADE');
  }
  );
}


export async function down(knex: Knex): Promise<void> {
}

