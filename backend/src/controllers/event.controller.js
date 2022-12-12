const eventService = require('../services/event.service');

module.exports = {
  getEvents: async (req, res) => {
    const events = await eventService.getEvents();

    res.status(200).json(events);
  },

  getEventById: async (req, res) => {
    const event = await eventService.getEventById(req.params.id);

    res.status(200).json(event);
  },

  editEvent: async (req, res) => {
    const event = await eventService.editEvent(req.params.id, req.body);

    res.status(200).json(event);
  },

  createEvent: async (req, res) => {
    const event = await eventService.createEvent(req.body);

    res.status(201).json(event);
  },

  deleteEvent: async (req, res) => {
    const { userId } = req.headers;
    const { id } = req.params;

    await eventService.deleteEvent(userId, id);

    res.status(204).end();
  },
};
