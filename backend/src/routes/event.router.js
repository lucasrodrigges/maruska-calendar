const route = require('express').Router();

const eventController = require('../controllers/event.controller');
const validations = require('../middlewares/validations');

route.get(
  '/event',
  validations.token,
  eventController.getEvents,
);

route.post(
  '/event',
  validations.token,
  validations.newEvent,
  eventController.createEvent,
);

module.exports = route;
