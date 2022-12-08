const { verifyToken } = require('../auth/auth');

module.exports = {
  tokenValidation: async (req, res, next) => {
    const { authorization } = req.headers;

    const payload = verifyToken(authorization);

    if (payload.error) return '';

    req.headers.userId = payload.userId;

    return next();
  },
};
