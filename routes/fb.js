const express = require('express');

const config = require('../config');

const router = express.Router();

module.exports = function (botController) {
    router.get('/facebook/receive', function (req, res) {
        if (req.query['hub.mode'] === 'subscribe') {
            if (req.query['hub.verify_token'] === config.FB_VERIFY_TOKEN) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        } else {
            res.send('OK');
        }
    });

    router.post('/facebook/receive', function(req, res) {

        // respond to FB that the webhook has been received.
        res.status(200).send('ok');

        const bot = botController.spawn({});

        // Now, pass the webhook into be processed
        botController.handleWebhookPayload(req, res, bot);
    });

    return router;
};
