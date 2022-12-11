const { hashSync, genSaltSync } = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Lucas Rodrigues',
      email: 'rodrigges@admin.com',
      password: hashSync('12345678', genSaltSync(10)),
      is_admin: true,
    }, {
      name: 'Marianna Nascimento',
      email: 'maruska@admin.com',
      password: hashSync('12345678', genSaltSync(10)),
      is_admin: true,
    }, {
      name: 'Paulo Hernandes',
      email: 'ph@gmail.com',
      password: hashSync('12345678', genSaltSync(10)),
    }], { });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
