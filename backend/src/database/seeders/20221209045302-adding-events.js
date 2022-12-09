module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('events', [{
      title: 'Mar da Espanha',
      description: 'Montar som às 13h.',
      when: new Date(),
      location: 'Av. Inácio Barbosa, 220 - Mosqueiro, Aracaju - SE',
    }, {
      title: 'Duna Beach',
      when: new Date(),
      location: 'Av. Inácio Barbosa, 3411 - Mosqueiro, Aracaju - SE',
    }, {
      title: 'Particular',
      when: new Date(),
      location: 'R. do Horto, 240 - Jabutiana, Aracaju - SE',
    }], { });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('events', null, {});
  },
};
