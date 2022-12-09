const { or } = require('sequelize').Op;
const Event = require('../database/models/Event');
const Musician = require('../database/models/Musician');
const HttpError = require('../utils/HttpError');

module.exports = {
  createEvent: async ({ musicians, ...eventFields }) => {
    const musiciansCheck = await Musician.findAll({
      where: {
        id: { [or]: musicians },
      },
    });

    if (musicians.length !== musiciansCheck.length) {
      throw new HttpError(409, 'One or more musicians are not registered.');
    }

    const event = await Event.create(eventFields);

    if (!event) throw new HttpError(409, 'Unable to create event.');

    await event.addMusician(musicians);

    const eventCreated = await Event.findOne({
      where: { id: event.id },
      include: {
        model: Musician,
        as: 'musicians',
      },
    });

    return eventCreated;
  },
};
