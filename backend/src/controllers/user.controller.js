const userService = require('../services/user.service');

module.exports = {
  login: async (req, res) => {
    const token = await userService.login(req.body);

    res.status(200).json(token);
  },

  getMe: async (req, res) => {
    const { userId } = req.headers;

    const user = await userService.getMe(userId);

    res.status(200).json(user);
  },

  getUsers: async (_req, res) => {
    const users = await userService.getUsers();

    res.status(200).json(users);
  },

  createUser: async (req, res) => {
    const token = await userService.createUser(req.body);

    res.status(201).json(token);
  },

  updateUser: async (req, res) => {
    const { userId } = req.headers;

    const user = await userService.updateUser(userId, req.body);

    res.status(200).json(user);
  },

  deleteMe: async (req, res) => {
    const { userId } = req.headers;

    await userService.deleteMe(userId);

    res.status(204).end();
  },
};
