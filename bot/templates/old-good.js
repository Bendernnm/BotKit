'use strict';

const {BOT} = require('../../const');

module.exports = order => ({
    'title'    : order.good.title,
    'image_url': order.good.image,
    'subtitle' : `${order.good.description} \n ${order.createdAt} \n ${order.location}`,
    'buttons'  : [{
        'type'   : 'postback',
        'title'  : 'Buy',
        'payload': BOT.PAYLOADS.BUY(order.good._id)
    }]
});
