'use strict';

const mongoose = require('mongoose');

const {OrderSchema} = require('../schemas');

const {DB: {MODEL}} = require('../../const');

module.exports = mongoose.model(MODEL.ORDER, OrderSchema);
