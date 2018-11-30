'use strict';

const {BOT} = require('../../const');

const TEMPLATES = require('../templates');

module.exports = function (controller) {
    controller.api.thread_settings.greeting(BOT.MESSAGES.WELCOME);

    controller.api.thread_settings.get_started(BOT.PAYLOADS.GET_STARTED);

    controller.api.thread_settings.menu([
        {
            'locale'                 : 'default',
            'composer_input_disabled': false,
            'call_to_actions'        : [
                {
                    'type'   : 'postback',
                    'title'  : 'hello',
                    'payload': 'hello'
                },
                {
                    'type'   : 'postback',
                    'title'  : 'profile',
                    'payload': '/profile'
                },
                {
                    'type'   : 'postback',
                    'title'  : 'menu',
                    'payload': 'menu'
                }
            ]
        }
    ]);

    controller.on(BOT.EVENTS.MESSAGE_RECEIVED, function (bot, message) {
        bot.reply(message, TEMPLATES.MAIN_MENU);
    });

    controller.on(BOT.EVENTS.FACEBOOK_POSTBACK, function (bot, message) {
        bot.reply(message, TEMPLATES.MAIN_MENU);
    });

    controller.hears(BOT.PAYLOADS.GET_STARTED, BOT.EVENTS.FACEBOOK_POSTBACK, function (bot, message) {
        bot.reply(message, TEMPLATES.MAIN_MENU);
    });
};
