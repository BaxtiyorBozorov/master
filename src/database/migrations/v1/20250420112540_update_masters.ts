import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('masters', (table) => {
        table.boolean('is_premium').defaultTo(false);
        table.date('premium_until').defaultTo(null);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('masters', (table) => {
        table.dropColumn('is_premium');
        table.dropColumn('premium_until');
    });
}
