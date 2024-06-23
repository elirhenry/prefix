/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('items').del();

  await knex('items').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Luke Skywalker',
      quantity: 7,
      image: 'https://saberspro.com/cdn/shop/files/luke-lightsaber-by-saberspro_500x.jpg?v=1712807242',
      description: 'Based on the classic weapon of one of the greatest masters to ever live, our Luke saber is built with the durability and unique style that will make any opponent think twice about disturbing your rest.',
    },
    {
      id: 2,
      user_id: 1,
      name: 'Darth Vadar',
      quantity: 8,
      image: 'https://saberspro.com/cdn/shop/files/vader-w_-hard-case-lightsaber-by-saberspro_500x.jpg?v=1712811265',
      description: 'The Vader saber presents a detailed and unique saber replica. The grooved hilt provides better grip allowing for precise maneuvers while dueling. The detailed activation switch adds a unique appearance to the saber. The highest quality T6 Aircraft Aluminum hilt and a polycarbonate blade create the ultimate combination providing durability and efficiency.',
    },
    {
      id: 3,
      user_id: 1,
      name: 'Mace Windu',
      quantity: 5,
      image: 'https://saberspro.com/cdn/shop/files/windu-w_-hard-case-lightsaber-by-saberspro_500x.jpg?v=1712812267',
      description: 'Mace Windu was one of the most distinctive members of the Jedi Order, so it was only logical that he carried one of the most distinctive Jedi weapons. Windu’s saber had a plasma blade of amethyst – a brilliant warning to enemies that the Jedi Order’s greatest champion was ready for battle.',
    },
    {
      id: 4,
      user_id: 2,
      name: 'Ahsoka Tano',
      quantity: 3,
      image: 'https://saberspro.com/cdn/shop/files/ahsoka-rebels-set-of-two-lightsaber-by-saberspro_ae04ba6b-7095-4af0-aef6-eb6b133cede4_500x.jpg?v=1712810890',
      description: 'The Ahsoka replica sabers present two curved hilts and durable blades. The unique curved design makes the saber feel realistic and solid. Suitable for either the front or back grip, the sabers will be a perfect addition to your collection. The highest quality T6 Aircraft Aluminum hilt and a polycarbonate blade create the ultimate combination providing durability and efficiency.',
    },
    {
      id: 5,
      user_id: 2,
      name: 'Darth Maul',
      quantity: 6,
      image: 'https://saberspro.com/cdn/shop/files/darth-maul-lightsaber-by-saberspro_02376936-1af3-4f61-9c56-beb0da659be5_500x.jpg?v=1712806435',
      description: 'This truly unique piece is two sabers attached at their T6 Aircraft Aluminum hilts so the polycarbonate blades can be spun in an effective defense or thrust toward your opponent’s chin to push them into a more compromising position. Add on the unique on-clash lighting, sound effects, and lighting styles, and you have the Darth Maul: a saber that fits the need of dueling or building your ever-growing collection.',
    },
  ]);
};