'use strict';

const mongoose = require('mongoose');

const {DB: {COLLECTION}} = require('../../../const');

const {DEFAULT_SCHEMA_OPTS} = require('../../default-opts');

const Schema = mongoose.Schema;

const fields = {

    sender: {
        $type   : String,
        required: true
    },

    token: {
        $type   : String,
        required: true
    },

    invited: [String]

};

const opts = {
    ...DEFAULT_SCHEMA_OPTS,
    collection: COLLECTION.REFERRAL_LINKS
};

const ReferralLinkSchema = new Schema(fields, opts);

module.exports = ReferralLinkSchema;
