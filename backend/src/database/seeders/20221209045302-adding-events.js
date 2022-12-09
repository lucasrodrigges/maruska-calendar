module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('events', [{
      title: 'Mar da Espanha',
      description: 'Montar som às 13h.',
      when: new Date(),
    }, {
      title: 'Duna Beach',
      when: new Date(),
    }, {
      title: 'Particular',
      when: new Date(),
    }], { });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('events', null, {});
  },
};
