module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('musicians', [{
      name: 'Lucas Rodrigues',
      instrument: 'Violão/Guitarra',
      phone_number: '5579991317466',
    }, {
      name: 'Filie Williams',
      instrument: 'Contrabaixo',
      phone_number: '5579991219009',
    }, {
      name: 'Paulo Hernandes',
      instrument: 'Bateria',
    }], { });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('musicians', null, {});
  },
};
