const userService = require('../services/user.service');

module.exports = {
  login: async (req, res) => {
    const token = await userService.login(req.body);

    res.status(200).json(token);
  },

  getUsers: async (_req, res) => {
    const users = await userService.getUsers();

    res.status(200).json(users);
  },

  createUser: async (req, res) => {
    const token = await userService.createUser(req.body);

    res.status(201).json(token);
  },
};
