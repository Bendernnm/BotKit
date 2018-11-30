'use strict';

const mongoose = require('mongoose');

const {ReferralLinkSchema} = require('../schemas');

const {DB: {MODEL}} = require('../../const');

module.exports = mongoose.model(MODEL.REFERRAL_LINK, ReferralLinkSchema);
