const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;
const config = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

module.exports = {
  createToken: (payload) => jwt.sign(payload, secret, config),

  verifyToken: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return { error: 'INVALID_TOKEN' };
    }
  },
};
