const route = require('express').Router();

const userController = require('../controllers/user.controller');
const validations = require('../middlewares/validations');

route.get(
  '/user',
  validations.tokenValidation,
  userController.getUsers,
);

module.exports = route;
