const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'JohnDoe',
      password: bcrypt.hash("Password123", saltRounds)},
      {id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        username: 'JaneDoe',
        password: bcrypt.hash("NewPassword321", saltRounds)},
  ]);
};