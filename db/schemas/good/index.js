'use strict';

const mongoose = require('mongoose');

const {DB: {COLLECTION}} = require('../../../const');

const {DEFAULT_SCHEMA_OPTS} = require('../../default-opts');

const Schema = mongoose.Schema;

const fields = {

    image: {
        $type   : String,
        required: true
    },

    title: {
        $type   : String,
        required: true
    },

    description: {
        $type   : String,
        required: true
    }

};

const opts = {
    ...DEFAULT_SCHEMA_OPTS,
    collection: COLLECTION.GOODS
};

const GoodSchema = new Schema(fields, opts);

module.exports = GoodSchema;
