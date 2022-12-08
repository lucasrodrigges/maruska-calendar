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
};
