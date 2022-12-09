/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_musicians', {
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Event',
          key: 'id',
        },
      },
      musician_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Musician',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('events_musicians');
  },
};
