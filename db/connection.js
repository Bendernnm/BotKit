'use strict';

const mongoose = require('mongoose');

module.exports.connect = (url, opts) => mongoose.connect(url, opts);

module.exports.onEvent = (event, cb) => mongoose.connection.on(event, cb);

module.exports.onceEvent = (event, cb) => mongoose.connection.once(event, cb);
