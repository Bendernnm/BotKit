'use strict';

const mongoose = require('mongoose');

const models = require('./models');
const schemas = require('./schemas');
const connection = require('./connection');
const defaultOpts = require('./default-opts');

module.exports = {
    models,
    schemas,
    connection,
    defaultOpts,
    db             : mongoose.connection,
    ObjectId       : mongoose.Types.ObjectId,
    isValidObjectId: mongoose.Types.ObjectId.isValid,
    set            : (property, value) => mongoose.set(property, value)
};
