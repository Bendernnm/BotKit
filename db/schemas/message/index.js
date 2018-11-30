'use strict';

const mongoose = require('mongoose');

const {DB: {COLLECTION, FROM_TYPE}} = require('../../../const');

const {DEFAULT_SCHEMA_OPTS} = require('../../default-opts');

const Schema = mongoose.Schema;

const fields = {

    user: {
        $type   : String,
        required: true
    },

    from: {
        $type   : String,
        required: true,
        enum    : Object.values(FROM_TYPE)
    },

    text: {
        $type   : String,
        required: false
    }

};

const opts = {
    ...DEFAULT_SCHEMA_OPTS,
    collection: COLLECTION.MESSAGES
};

const MessageSchema = new Schema(fields, opts);

module.exports = MessageSchema;
