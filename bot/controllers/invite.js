'use strict';

const uuid = require('uuid');

const {BOT} = require('../../const');

const TEMPLATES = require('../templates');

const {
    models: {
        ReferralLinkModel
    }
} = require('../../db');

module.exports = function (controller) {
    controller.hears(BOT.KEYWORDS.MENU_ITEMS.INVITE, BOT.EVENTS.MESSAGE_RECEIVED, async function (bot, message) {
        try {
            const payload = message.quick_reply && message.quick_reply.payload;

            if (!payload || payload !== BOT.PAYLOADS.MENU_ITEMS.INVITE) {
                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const token = uuid.v4();

            const referralLinkModel = new ReferralLinkModel({
                token,
                sender: message.sender.id
            });

            await referralLinkModel.save();

            bot.reply(message, TEMPLATES.SHARE_FORM(message.sender.id, token), function (err) {
                if (err) {
                    return console.error(err);
                }

                setTimeout(() => bot.reply(message, TEMPLATES.MENU_BACK_BUTTON), 3000);
            });
        } catch (err) {
            console.error(err);
        }
    });

    controller.on('facebook_referral', async function (bot, message) {
        try {
            bot.reply(message, BOT.MESSAGES.CONNECTED_BY_INVITE);

            const [senderId, token] = message.referral.ref.split(',');

            bot.send({
                recipient: {
                    id: senderId
                },
                message  : {
                    text: BOT.MESSAGES.ACTIVATED_LINK(token)
                }
            });

            await ReferralLinkModel.updateOne({token}, {$addToSet: {invited: message.sender.id}});
        } catch (err) {
            console.error(err);
        }
    });
};
