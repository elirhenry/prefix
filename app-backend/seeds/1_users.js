const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'JohnDoe',
      password: bcrypt.hashSync("Password123", saltRounds)},
  ]);
};