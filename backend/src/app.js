const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes.userRoute);
app.use(errorHandler);

module.exports = app;
