module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('events_musicians', [{
      event_id: 2,
      musician_id: 1,
    }, {
      event_id: 2,
      musician_id: 2,
    }, {
      event_id: 2,
      musician_id: 3,
    }, {
      event_id: 1,
      musician_id: 1,
    }, {
      event_id: 1,
      musician_id: 3,
    }, {
      event_id: 3,
      musician_id: 1,
    }], { });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('events_musicians', null, {});
  },
};
