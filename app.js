'use strict';

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const botController = require('./bot');

const routes = require('./routes');
const fbRouter = require('./routes/fb')(botController);

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use(fbRouter);

module.exports = app;
