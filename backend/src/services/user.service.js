const { createToken } = require('../auth/auth');
const User = require('../database/models/User');
const HttpError = require('../utils/HttpError');

module.exports = {
  getUsers: async () => User.findAll({
    attributes: {
      exclude: ['password'],
    },
  }),

  createUser: async (user) => {
    const [newUser, created] = await User.findOrCreate({
      where: { email: user.email },
      defaults: { ...user },
    });

    if (!created) throw new HttpError(409, 'User already registered.');

    const token = createToken({ id: newUser.id });

    return { token };
  },

};
