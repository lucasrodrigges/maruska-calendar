const Joi = require('joi');

module.exports = {
  newUserSchema: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    picture: Joi.string(),
    isAdmin: Joi.boolean(),
  }),
};
