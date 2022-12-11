require('dotenv').config();

module.exports = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};
