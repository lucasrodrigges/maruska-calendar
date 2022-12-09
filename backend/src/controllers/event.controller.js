const eventService = require('../services/event.service');

module.exports = {
  createEvent: async (req, res) => {
    const event = await eventService.createEvent(req.body);

    res.status(201).json(event);
  },
};
