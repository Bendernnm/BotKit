'use strict';

module.exports = {

    DEFAULT_CONNECTION_OPTS: {
        useNewUrlParser: true,

        bufferCommands: false,

        autoIndex: false,

        autoReconnect    : true,
        reconnectTries   : 10,
        reconnectInterval: 10 * 1000,

        promiseLibrary: global.Promise,

        w       : 'majority',
        j       : true,
        wtimeout: 1000
    },

    DEFAULT_SCHEMA_OPTS: {
        timestamps    : true,
        strict        : true,
        minimize      : true,
        id            : true,
        versionKey    : false,
        bufferCommands: false,
        autoIndex     : false,
        typeKey       : '$type',
        toJSON        : {
            getters: true,
            virtual: true
        },
        writeCorner   : {
            w       : 'majority',
            j       : true,
            wtimeout: 1000
        }
    },

};
