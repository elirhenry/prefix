exports.up = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.integer('user_id').nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('items', table => {
    table.integer('user_id').notNullable().alter();
  });
};