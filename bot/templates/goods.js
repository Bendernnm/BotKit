'use strict';

module.exports = goods => ({
    'attachment': {
        'type'   : 'template',
        'payload': {
            'template_type': 'generic',
            'elements'     : goods
        }
    }
});
