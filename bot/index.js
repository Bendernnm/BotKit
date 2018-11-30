'use strict';

const winston = require('winston');
const Bot = require('botkit');

const config = require('../config');

const controller = Bot.facebookbot({
    access_token: config.FB_PAGE_TOKEN,
    verify_token: config.FB_VERIFY_TOKEN,
    logger      : winston.createLogger({
        levels    : winston.config.syslog.levels,
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({filename: './bot.log'})
        ]
    })
});

// middlewares
require('./middlewares')(controller);

// settings
require('./settings')(controller);

// controllers
require('./controllers')(controller);

module.exports = controller;
