const route = require('express').Router();

const userController = require('../controllers/user.controller');
const validations = require('../middlewares/validations');

route.get(
  '/user',
  validations.token,
  userController.getUsers,
);

route.get(
  '/user/me',
  validations.token,
  userController.getMe,
);

route.post(
  '/login',
  validations.login,
  userController.login,
);

route.post(
  '/user',
  validations.newUser,
  userController.createUser,
);

module.exports = route;
