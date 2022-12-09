const eventService = require('../services/event.service');

module.exports = {
  getEvents: async (req, res) => {
    const events = await eventService.getEvents();

    res.status(200).json(events);
  },

  createEvent: async (req, res) => {
    const event = await eventService.createEvent(req.body);

    res.status(201).json(event);
  },
};
