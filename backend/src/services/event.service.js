const { or, gt } = require('sequelize').Op;
const Event = require('../database/models/Event');
const Musician = require('../database/models/Musician');
const User = require('../database/models/User');
const HttpError = require('../utils/HttpError');

module.exports = {
  getEvents: async () => Event.findAll({
    where: {
      when: { [gt]: new Date() },
    },
    order: [['when', 'ASC']],
    include: {
      model: Musician,
      as: 'musicians',
      attributes: ['id', 'name', 'instrument'],
      through: { attributes: [] },
    },
  }),

  getEventById: async (id) => {
    const event = await Event.findByPk(id, {
      include: {
        model: Musician,
        as: 'musicians',
        attributes: ['id', 'name', 'instrument'],
        through: { attributes: [] },
      },
    });

    if (!event) throw new HttpError(404, 'Event not found.');

    return event;
  },

  editEvent: async (id, { musicianIds, ...eventFields }) => {
    const event = await Event.findByPk(id, {
      include: {
        model: Musician,
        as: 'musicians',
        attributes: ['id', 'name', 'instrument'],
        through: { attributes: [] },
      },
    });

    if (!event) throw new HttpError(404, 'Event not found.');

    const musiciansCheck = await Musician.findAll({
      where: {
        id: { [or]: musicianIds },
      },
    });

    if (musicianIds.length !== musiciansCheck.length) {
      throw new HttpError(409, 'One or more musicians are not registered.');
    }

    await event.update(eventFields);
    await event.removeMusician(event.dataValues.musicians);
    await event.addMusician(musicianIds);

    return event;
  },

  createEvent: async ({ musicianIds, ...eventFields }) => {
    const musiciansCheck = await Musician.findAll({
      where: {
        id: { [or]: musicianIds },
      },
    });

    if (musicianIds.length !== musiciansCheck.length) {
      throw new HttpError(409, 'One or more musicians are not registered.');
    }

    const event = await Event.create(eventFields);

    if (!event) throw new HttpError(409, 'Unable to create event.');

    await event.addMusician(musicianIds);

    const eventCreated = await Event.findOne({
      where: { id: event.id },
      include: {
        model: Musician,
        as: 'musicians',
      },
    });

    return eventCreated;
  },

  deleteEvent: async (userId, id) => {
    const user = await User.findByPk(userId);

    if (!user.isAdmin) throw new HttpError(409, 'User not authorized');

    const event = await Event.findByPk(id);

    if (!event) throw new HttpError(404, 'Event not found.');

    event.destroy();
  },
};
