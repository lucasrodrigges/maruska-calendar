const userService = require('../services/user.service');

module.exports = {
  getUsers: async (_req, res) => {
    const users = await userService.getUsers();

    res.status(200).json(users);
  },
};
