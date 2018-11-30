'use strict';

const mongoose = require('mongoose');

const {DB: {COLLECTION, MODEL}} = require('../../../const');

const {DEFAULT_SCHEMA_OPTS} = require('../../default-opts');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const fields = {

    fbId: {
        $type   : String,
        required: true
    },

    good: {
        $type   : ObjectId,
        ref     : MODEL.GOOD,
        required: true
    },

    location: {
        $type   : String,
        required: true
    }

};

const opts = {
    ...DEFAULT_SCHEMA_OPTS,
    collection: COLLECTION.ORDERS
};

const OrderSchema = new Schema(fields, opts);

module.exports = OrderSchema;
