const route = require('express').Router();

const eventController = require('../controllers/event.controller');
const validations = require('../middlewares/validations');

route.post(
  '/event',
  validations.token,
  validations.newEvent,
  eventController.createEvent,
);

module.exports = route;
