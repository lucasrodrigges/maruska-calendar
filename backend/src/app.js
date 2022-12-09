const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes.userRoute);
app.use(routes.musicianRoute);
app.use(routes.eventRoute);

app.use(errorHandler);

module.exports = app;
