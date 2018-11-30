'use strict';

const mongoose = require('mongoose');

const {GoodSchema} = require('../schemas');

const {DB: {MODEL}} = require('../../const');

module.exports = mongoose.model(MODEL.GOOD, GoodSchema);
