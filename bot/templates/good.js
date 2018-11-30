'use strict';

const {BOT} = require('../../const');

module.exports = good => ({
    'title'    : good.title,
    'image_url': good.image,
    'subtitle' : good.description,
    'buttons'  : [{
        'type'   : 'postback',
        'title'  : 'Show more',
        'payload': BOT.PAYLOADS.SHOW_MORE(good._id)
    }]
});
