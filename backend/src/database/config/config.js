require('dotenv').config();

module.exports = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect: 'mysql',
  timezone: '00:00',
  dialectOptions: {
    useUTC: false,
    timezone: 'Z',
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};
