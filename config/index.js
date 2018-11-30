'use strict';

const ENV = process.env;

module.exports = {
    NODE_ENV: ENV.NODE_ENV || 'development',

    PORT: +ENV.PORT || 4040,
    HOST: ENV.HOST || '127.0.0.1',

    MONGO_DB_CONNECTION_URL: ENV.MONGO_DB_CONNECTION_URL,

    FB_GROUP_NAME  : ENV.GROUP_NAME,
    FB_PAGE_TOKEN  : ENV.FB_PAGE_TOKEN,
    FB_VERIFY_TOKEN: ENV.FB_VERIFY_TOKEN
};
