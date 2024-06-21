/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('name');
    table.integer('quantity');
    table.string('image');
    table.text('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};