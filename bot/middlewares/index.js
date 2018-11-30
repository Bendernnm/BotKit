'use strict';

const _ = require('lodash');

const {
    models: {
        UserModel,
        MessageModel
    }
} = require('../../db');

const {BOT, DB: {FROM_TYPE}} = require('../../const');

const activeUsers = new Map();

module.exports = function (controller) {
    controller.middleware.receive.use(async function (bot, message, next) {
        try {
            if (!message.type || message.type !== 'message_received') {
                return next();
            }

            const fbId = message.sender.id;

            const activeUser = activeUsers.get(fbId);

            if (activeUser && Date.now() - activeUser < BOT.UPDATE_USER_TIMING) {
                return next();
            }

            const fbUser = await bot.getMessageUser(message);

            const profile = _.pick(fbUser, 'email', 'gender', 'locale');

            profile.fbId = fbId;
            profile.lastName = fbUser.last_name;
            profile.firstName = fbUser.first_name;

            await UserModel.updateOne({fbId}, {$set: profile}, {upsert: true});

            activeUsers.set(fbId, Date.now());
            next();
        } catch (err) {
            console.error(err);
        }
    });

    controller.middleware.receive.use(async function (bot, message, next) {
        try {
            if (message.type !== 'message_received') {
                return next();
            }

            const messageModel = new MessageModel({
                text: message.text,
                from: FROM_TYPE.USER,
                user: message.sender.id
            });

            await messageModel.save();

            next();
        } catch (err) {
            console.error(err);
        }
    });

    controller.middleware.send.use(async function (bot, message, next) {
        try {
            if (!message.to) {
                return next();
            }

            const messageModel = new MessageModel({
                user: message.to,
                text: message.text,
                from: FROM_TYPE.BOT
            });

            await messageModel.save();

            next();
        } catch (err) {
            console.error(err);
        }
    });
};
