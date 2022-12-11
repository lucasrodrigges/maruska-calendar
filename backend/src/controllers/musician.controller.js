const musicianService = require('../services/musician.service');

module.exports = {
  getMusicians: async (_req, res) => {
    const musicians = await musicianService.getMusicians();

    res.status(200).json(musicians);
  },

  createMusician: async (req, res) => {
    const newMusician = await musicianService.createMusician(req.body);

    res.status(201).json(newMusician);
  },
};
