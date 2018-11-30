'use strict';

const {BOT} = require('../../const');

module.exports = {
    'text'         : 'Back to main menu?',
    'quick_replies': [
        {
            'content_type': 'text',
            'title'       : BOT.KEYWORDS.MENU_ITEMS.BACK_BUTTON,
            'payload'     : BOT.PAYLOADS.MENU_ITEMS.BACK_BUTTON
        }
    ]
};
