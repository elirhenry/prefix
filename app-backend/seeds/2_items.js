/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del();

  await knex('items').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Luke',
      quantity: 12,
      description: 'Based on the classic weapon of one of the greatest masters to ever live, our Luke saber is built with the durability and unique style that will make any opponent think twice about disturbing your rest.',
    },
  ]);
};