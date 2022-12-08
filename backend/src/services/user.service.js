const User = require('../database/models/User');

module.exports = {
  getUsers: async () => User.findAll({
    attributes: {
      exclude: ['password'],
    },
  }),
};
