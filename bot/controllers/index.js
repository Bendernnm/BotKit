'use strict';

module.exports = function (controller) {
    require('./menu')(controller);
    require('./shop')(controller);
    require('./invite')(controller);
    require('./default')(controller);
    require('./purchases')(controller);
};
