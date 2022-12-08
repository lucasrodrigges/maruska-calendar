const { verifyToken } = require('../auth/auth');
const HttpError = require('../utils/HttpError');
const schemas = require('./schemas/schemas');

const formatError = (error) => ({
  error: error.details[0].type.endsWith('required') ? 400 : 422,
  message: error.message,
});

module.exports = {
  token: async (req, _res, next) => {
    const { authorization } = req.headers;

    const payload = verifyToken(authorization);

    if (payload.error) return '';

    req.headers.userId = payload.userId;

    return next();
  },

  login: async (req, _res, next) => {
    const { error } = schemas.login.validate(req.body);

    if (error) throw new HttpError(formatError(error).error, formatError(error).message);

    return next();
  },

  newUser: async (req, _res, next) => {
    const { error } = schemas.newUser.validate(req.body);

    if (error) throw new HttpError(formatError(error).error, formatError(error).message);

    return next();
  },
};
