'use strict';

const {BOT} = require('../../const');

const TEMPLATES = require('../templates');

module.exports = function (controller) {
    controller.hears(
        [BOT.KEYWORDS.MENU, BOT.PAYLOADS.MENU_ITEMS.BACK_BUTTON],
        [BOT.EVENTS.FACEBOOK_POSTBACK, BOT.EVENTS.MESSAGE_RECEIVED],
        function (bot, message) {
            bot.reply(message, TEMPLATES.MAIN_MENU);
        }
    );
};
