'use strict';

const {BOT} = require('../../const');

module.exports = {
    'text'         : 'Choose one of:',
    'quick_replies': [
        {
            'content_type': 'text',
            'title'       : BOT.KEYWORDS.MENU_ITEMS.MY_PURCHASES,
            'payload'     : BOT.PAYLOADS.MENU_ITEMS.MY_PURCHASES
        },
        {
            'content_type': 'text',
            'title'       : BOT.KEYWORDS.MENU_ITEMS.SHOP,
            'payload'     : BOT.PAYLOADS.MENU_ITEMS.SHOP
        },
        // {
        //     'content_type': 'text',
        //     'title'       : BOT.KEYWORDS.MENU_ITEMS.FAVORITES,
        //     'payload'     : BOT.PAYLOADS.MENU_ITEMS.FAVORITES
        // },
        {
            'content_type': 'text',
            'title'       : BOT.KEYWORDS.MENU_ITEMS.INVITE,
            'payload'     : BOT.PAYLOADS.MENU_ITEMS.INVITE
        }
    ]
};
