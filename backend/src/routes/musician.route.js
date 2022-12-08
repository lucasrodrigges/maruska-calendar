const route = require('express').Router();

const musicianController = require('../controllers/musician.controller');

route.get(
  '/musician',
  musicianController.getMusicians,
);

module.exports = route;
