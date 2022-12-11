const route = require('express').Router();

const eventController = require('../controllers/event.controller');
const validations = require('../middlewares/validations');

route.get(
  '/event',
  validations.token,
  eventController.getEvents,
);

route.get(
  '/event/:id',
  validations.token,
  eventController.getEventById,
);

route.post(
  '/event',
  validations.token,
  validations.newEvent,
  eventController.createEvent,
);

route.delete(
  '/event/:id',
  validations.token,
  eventController.deleteEvent,
);

module.exports = route;
