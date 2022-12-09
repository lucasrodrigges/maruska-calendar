const { hashSync, genSaltSync } = require('bcrypt');
const { createToken } = require('../auth/auth');
const User = require('../database/models/User');
const HttpError = require('../utils/HttpError');

module.exports = {
  login: async (userFields) => {
    const user = await User.findOne({
      where: userFields,
    });

    if (!user) throw new HttpError(409, 'User not found or wrong password.');

    const token = createToken({ userId: user.id });

    return { token };
  },

  getUsers: async () => User.findAll({
    attributes: {
      exclude: ['password'],
    },
  }),

  getMe: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new HttpError(404, 'User not foud.');

    return user;
  },

  createUser: async ({ password, ...user }) => {
    const [newUser, created] = await User.findOrCreate({
      where: { email: user.email },
      defaults: {
        password: hashSync(password, genSaltSync(10)),
        ...user,
      },
    });

    if (!created) throw new HttpError(409, 'User already registered.');

    const token = createToken({ userId: newUser.id });

    return { token };
  },

  updateUser: async (id, userFields) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new HttpError(404, 'User not found.');

    user.update(userFields);

    return user;
  },

};
