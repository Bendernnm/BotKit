'use strict';

const mongoose = require('mongoose');

const {DB: {COLLECTION}} = require('../../../const');

const {DEFAULT_SCHEMA_OPTS} = require('../../default-opts');

const Schema = mongoose.Schema;

const fields = {

    fbId: {
        $type   : String,
        required: true
    },

    email: {
        $type   : String,
        required: false
    },

    gender: {
        $type   : String,
        required: false
    },

    locale: {
        $type   : String,
        required: false
    },

    lastName: {
        $type   : String,
        required: true
    },

    firstName: {
        $type   : String,
        required: true
    },

    phone: {
        $type   : String,
        required: false
    }

};

const opts = {
    ...DEFAULT_SCHEMA_OPTS,
    collection: COLLECTION.USERS
};

const UserSchema = new Schema(fields, opts);

module.exports = UserSchema;
