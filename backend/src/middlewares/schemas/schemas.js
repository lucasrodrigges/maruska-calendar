const Joi = require('joi');

module.exports = {
  newUser: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    picture: Joi.string(),
    isAdmin: Joi.boolean(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  newMusician: Joi.object({
    name: Joi.string().min(1).required(),
    instrument: Joi.string().min(1).required(),
    phoneNumber: Joi.string().min(13),
  }),

  newEvent: Joi.object({
    title: Joi.string().min(1).required(),
    when: Joi.string().min(1).required(),
    location: Joi.string().min(1).required(),
    musicians: Joi.array().items(Joi.number()).min(1),
    description: Joi.string(),
  }),
};
