'use strict';

const mongoose = require('mongoose');

const {UserSchema} = require('../schemas');

const {DB: {MODEL}} = require('../../const');

module.exports = mongoose.model(MODEL.USER, UserSchema);
