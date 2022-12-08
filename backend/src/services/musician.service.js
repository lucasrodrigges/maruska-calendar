const Musician = require('../database/models/Musician');

module.exports = {
  getMusicians: async () => Musician.findAll(),
};
