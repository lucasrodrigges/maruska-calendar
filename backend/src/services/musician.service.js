const Musician = require('../database/models/Musician');
const HttpError = require('../utils/HttpError');

module.exports = {
  getMusicians: async () => Musician.findAll(),

  createMusician: async (musician) => {
    const [newMusician, created] = await Musician.findOrCreate({
      where: musician,
    });

    if (!created) throw new HttpError(409, 'Musician already registered.');

    return newMusician;
  },
};
