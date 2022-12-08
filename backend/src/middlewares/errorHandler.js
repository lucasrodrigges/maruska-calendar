const HttpError = require('../utils/HttpError');

module.exports = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'INTERNAL ERROR' });
};
