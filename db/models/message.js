'use strict';

const mongoose = require('mongoose');

const {MessageSchema} = require('../schemas');

const {DB: {MODEL}} = require('../../const');

module.exports = mongoose.model(MODEL.MESSAGE, MessageSchema);
