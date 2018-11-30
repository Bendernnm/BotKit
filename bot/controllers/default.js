'use strict';

const _ = require('lodash');

const {BOT} = require('../../const');

module.exports = function (controller) {
    controller.hears(BOT.KEYWORDS.HELLO, [BOT.EVENTS.MESSAGE_RECEIVED, BOT.EVENTS.FACEBOOK_POSTBACK], function (bot, message) {
        bot.reply(message, BOT.MESSAGES.HELLO);
    });

    controller.hears(BOT.KEYWORDS.USER_INFO, [BOT.EVENTS.MESSAGE_RECEIVED, BOT.EVENTS.FACEBOOK_POSTBACK], function (bot, message) {
        // bot.botkit.api.user_profile(message.user, ['first_name', 'last_name']).then(console.log);
        bot.getMessageUser(message).then(user => {
            try {
                const profile = _.pick(user, 'id', 'first_name', 'last_name', 'email', 'gender', 'locale');

                bot.reply(message, JSON.stringify(profile));
            } catch (err) {
                console.error(err);
            }
        });
    });
};
