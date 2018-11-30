'use strict';

const {BOT} = require('../../const');

module.exports = good => ({
    'attachment': {
        'type'   : 'template',
        'payload': {
            'template_type': 'generic',
            'elements'     : [
                {
                    'title'    : good.title,
                    'image_url': good.image,
                    'subtitle' : good.description,
                    'buttons'  : [
                        {
                            'type'   : 'postback',
                            'title'  : 'Buy',
                            'payload': BOT.PAYLOADS.BUY(good._id)
                        },
                        {
                            'type'   : 'postback',
                            'title'  : BOT.KEYWORDS.MENU_ITEMS.BACK_BUTTON,
                            'payload': BOT.PAYLOADS.MENU_ITEMS.BACK_BUTTON
                        },
                    ]
                }
            ]
        }
    }
});
