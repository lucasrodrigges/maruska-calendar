const route = require('express').Router();

const musicianController = require('../controllers/musician.controller');
const validations = require('../middlewares/validations');

route.get(
  '/musician',
  musicianController.getMusicians,
);

route.post(
  '/musician',
  validations.newMusician,
  musicianController.createMusician,
);

module.exports = route;
