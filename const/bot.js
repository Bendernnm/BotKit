'use strict';

module.exports = {
    UPDATE_USER_TIMING: 2 * 60 * 60 * 1000,

    MESSAGES: {
        HELLO              : 'Hello :)',
        WELCOME            : 'Look to Up and enjoy. More.',
        ACTIVATED_LINK     : linkToken => `Your link, ${linkToken}, was activated.`,
        CONNECTED_BY_INVITE: 'You used referral link. Congrats, you was connect to the best chat bot in the world.'
    },

    PAYLOADS: {
        BUY        : id => `buy_${id}`,
        SHOW_MORE  : id => `show_more_${id}`,
        GET_STARTED: 'get_started_payload',
        MENU_ITEMS : {
            MY_PURCHASES: 'mps',
            SHOP        : 'sh',
            FAVORITES   : 'fvs',
            INVITE      : 'if',
            BACK_BUTTON : 'bbtn'
        }
    },

    KEYWORDS: {
        BUY       : '^buy_',
        SHOW_MORE : '^show_more_',
        HELLO     : ['hi', 'hello'],
        USER_INFO : ['/user', '/profile'],
        MENU      : ['menu', '/menu', '/m'],
        MENU_ITEMS: {
            SHOP        : 'Shop',
            FAVORITES   : 'Favorites',
            MY_PURCHASES: 'My purchases',
            INVITE      : 'To invite a friend',
            BACK_BUTTON : 'Return to main menu'
        }
    },

    EVENTS: {
        MESSAGE_RECEIVED : 'message_received',
        FACEBOOK_POSTBACK: 'facebook_postback'
    }
};