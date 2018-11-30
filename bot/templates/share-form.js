'use strict';

const config = require('../../config');

module.exports = (senderId, token) => ({
    'attachment': {
        'type'   : 'template',
        'payload': {
            'template_type': 'generic',
            'elements'     : [
                {
                    'title'    : 'Referral link',
                    'subtitle' : 'Invite your friends',
                    'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKqR6By8KYNW_92Q-kdPd2Bn-Ol7Y12VQXmStx29aZiaTCkXnwg',
                    'buttons'  : [
                        {
                            'type'          : 'element_share',
                            'share_contents': {
                                'attachment': {
                                    'type'   : 'template',
                                    'payload': {
                                        'template_type': 'generic',
                                        'elements'     : [
                                            {
                                                'title'         : 'Use cool chat bot',
                                                'subtitle'      : 'Connect to new cool bot, killer of fb',
                                                'image_url'     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKqR6By8KYNW_92Q-kdPd2Bn-Ol7Y12VQXmStx29aZiaTCkXnwg',
                                                'default_action': {
                                                    'type': 'web_url',
                                                    'url' : `http://m.me/${config.FB_GROUP_NAME}?ref=${senderId},${token}`
                                                },
                                                'buttons'       : [
                                                    {
                                                        'type' : 'web_url',
                                                        'url'  : `http://m.me/${config.FB_GROUP_NAME}?ref=${senderId},${token}`,
                                                        'title': 'Referral link'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
});
