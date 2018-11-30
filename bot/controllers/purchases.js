'use strict';

const {BOT, DB: {COLLECTION}} = require('../../const');

const TEMPLATES = require('../templates');

const {
    models: {
        OrderModel
    }
} = require('../../db');

module.exports = function (controller) {
    controller.hears(BOT.KEYWORDS.MENU_ITEMS.MY_PURCHASES, BOT.EVENTS.MESSAGE_RECEIVED, async function (bot, message) {
        try {
            const aggregateParams = [];
            const payload = message.quick_reply && message.quick_reply.payload;

            if (!payload || payload !== BOT.PAYLOADS.MENU_ITEMS.MY_PURCHASES) {
                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            aggregateParams.push(
                {
                    $match: {
                        fbId: message.sender.id
                    }
                },
                {
                    $lookup: {
                        from        : COLLECTION.GOODS,
                        localField  : 'good',
                        foreignField: '_id',
                        as          : 'good'

                    }
                },
                {
                    $addFields: {
                        good: {$arrayElemAt: ['$good', 0]}
                    }
                },
                {
                    $project: {
                        _id      : 1,
                        createdAt: 1,
                        location : 1,
                        good     : 1
                    }
                }
            );

            const goods = await OrderModel.aggregate(aggregateParams);

            const elements = goods.map(TEMPLATES.OLD_GOOD);

            bot.reply(message, TEMPLATES.GOODS(elements), function (err) {
                if (err) {
                    return console.error(err);
                }

                setTimeout(() => bot.reply(message, TEMPLATES.MENU_BACK_BUTTON), 3000);
            });
        } catch (err) {
            console.error(err);
        }
    });
};
