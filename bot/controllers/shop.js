'use strict';

const {BOT} = require('../../const');

const TEMPLATES = require('../templates');

const {
    isValidObjectId,
    models: {
        UserModel,
        GoodModel,
        OrderModel
    }
} = require('../../db');

module.exports = function (controller) {
    controller.hears(BOT.KEYWORDS.MENU_ITEMS.SHOP, BOT.EVENTS.MESSAGE_RECEIVED, async function (bot, message) {
        try {
            const payload = message.quick_reply && message.quick_reply.payload;

            if (!payload || payload !== BOT.PAYLOADS.MENU_ITEMS.SHOP) {
                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const goods = await GoodModel.find({}).limit(5).lean();

            const elements = goods.map(TEMPLATES.GOOD);

            bot.reply(message, TEMPLATES.GOODS(elements));
        } catch (err) {
            console.error(err);
        }
    });

    controller.hears(BOT.KEYWORDS.SHOW_MORE, BOT.EVENTS.FACEBOOK_POSTBACK, async function (bot, message) {
        try {
            if (!message.postback.payload || !message.postback.payload) {
                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const goodId = message.postback.payload.split('_').pop();

            if (!isValidObjectId(goodId)) {
                console.error('Good not found');

                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const good = await GoodModel.findById(goodId).lean();

            if (!good) {
                console.error('Good not found');

                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            bot.reply(message, TEMPLATES.GOOD_DETAILS(good));
        } catch (err) {
            console.error(err);
        }
    });

    controller.hears(BOT.KEYWORDS.BUY, BOT.EVENTS.FACEBOOK_POSTBACK, async function (bot, message) {
        try {
            if (!message.postback.payload || !message.postback.payload) {
                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const fbId = message.sender.id;
            const goodId = message.postback.payload.split('_').pop();

            if (!isValidObjectId(goodId)) {
                console.error('Good not found');

                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            const [good, userModel] = await Promise.all([
                GoodModel.findById(goodId).lean(),
                UserModel.findOne({fbId})
            ]);

            if (!good) {
                console.error('Good not found');

                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            if (!userModel) {
                console.error('User not found');

                return bot.reply(message, TEMPLATES.MAIN_MENU);
            }

            bot.startConversation(message, function (err, convo) {

                convo.say(`Good: ${good.title}`);

                if (!userModel.get('phone')) {
                    convo.addQuestion('Give your phone', async function (response, convo) {
                        try {
                            userModel.set('phone', response.text);

                            await userModel.save();

                            convo.next();
                        } catch (err) {
                            console.error(err);

                            convo.stop();
                        }
                    }, {}, 'default');
                }

                convo.addQuestion('Write location', async function (response, convo) {
                    try {
                        const orderModel = new OrderModel({
                            fbId,
                            good    : goodId,
                            location: response.text
                        });

                        await orderModel.save();

                        convo.say('Order was created successfully');

                        convo.next();
                    } catch (err) {
                        console.error(err);

                        convo.stop();
                    }
                }, {}, 'default');
            });
        } catch (err) {
            console.error(err);
        }
    });
};
