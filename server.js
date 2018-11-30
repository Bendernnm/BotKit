'use strict';

require('dotenv').config({path: './config/.env'});

const http = require('http');

const dbManger = require('./db');

const {PORT, HOST, MONGO_DB_CONNECTION_URL} = require('./config');

dbManger.connection.connect(MONGO_DB_CONNECTION_URL, dbManger.defaultOpts.DEFAULT_CONNECTION_OPTS);

dbManger.set('runValidators', true);

dbManger.connection.onEvent('connected', () => console.log('db connected'));
dbManger.connection.onEvent('reconnected', () => console.log('db reconnected'));
dbManger.connection.onEvent('disconnected', () => console.log('db disconnected'));
dbManger.connection.onEvent('close', arg => console.log(`db close: ${arg}`));
dbManger.connection.onEvent('error', err => console.error(err));

dbManger.connection.onEvent('reconnectFailed', () => {
    console.error('db reconnectFailed');

    // eslint-disable-next-line no-process-exit
    process.exit(1);
});

dbManger.connection.onceEvent('open', () => {
    console.log('db open');

    const app = require('./app');

    const httpServer = http.createServer(app);

    httpServer.on('error', console.error);
    httpServer.on('listening', () => console.log('http://' + HOST + ':' + PORT + '/'));

    httpServer.listen(PORT, HOST);
});

process.on('unhandledRejection', reason => {
    console.error(reason);

    // eslint-disable-next-line no-process-exit
    process.exit(1);
});

process.on('uncaughtException', err => {
    console.error(err);

    // eslint-disable-next-line no-process-exit
    process.exit(1);
});
