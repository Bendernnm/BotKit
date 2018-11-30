'use strict';

require('dotenv').config({path: './config/.env'});

const dbManger = require('../db');

const {MONGO_DB_CONNECTION_URL} = require('../config');

dbManger.connection.connect(MONGO_DB_CONNECTION_URL, dbManger.defaultOpts.DEFAULT_CONNECTION_OPTS);

dbManger.set('runValidators', true);

dbManger.connection.onEvent('connected', () => console.log('db connected'));
dbManger.connection.onEvent('reconnected', () => console.log('db reconnected'));
dbManger.connection.onEvent('disconnecting', () => console.log('db disconnecting'));
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

    dbManger.models.GoodModel.insertMany([
        {
            title      : 'good 1',
            image      : 'https://5.imimg.com/data5/YQ/HO/MY-28050694/mens-formal-check-shirts-500x500.jpg',
            description: 'Euismod fames id lectus aenean nibh pretium hendrerit blandit enim etiam euismod vulputate maecenas id, dictumst mi dui taciti convallis cursus turpis cubilia dolor facilisis lorem quisque facilisis nibh ligula fermentum faucibus convallis ipsum netus.'
        },
        {
            title      : 'good 2',
            image      : 'https://s7d4.scene7.com/is/image/JCPenney/DP0226201815163831M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
            description: 'Euismod fames id lectus aenean nibh pretium hendrerit blandit enim etiam euismod vulputate maecenas id, dictumst mi dui taciti convallis cursus turpis cubilia dolor facilisis lorem quisque facilisis nibh ligula fermentum faucibus convallis ipsum netus.'
        },
        {
            title      : 'good 3',
            image      : 'https://rukminim1.flixcart.com/image/612/612/shirt/s/h/y/46-bfrybluesht02-being-fab-original-imaekjr8ymhnxznp.jpeg?q=70',
            description: 'Euismod fames id lectus aenean nibh pretium hendrerit blandit enim etiam euismod vulputate maecenas id, dictumst mi dui taciti convallis cursus turpis cubilia dolor facilisis lorem quisque facilisis nibh ligula fermentum faucibus convallis ipsum netus.'
        },
        {
            title      : 'good 4',
            image      : 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
            description: 'Euismod fames id lectus aenean nibh pretium hendrerit blandit enim etiam euismod vulputate maecenas id, dictumst mi dui taciti convallis cursus turpis cubilia dolor facilisis lorem quisque facilisis nibh ligula fermentum faucibus convallis ipsum netus.'
        },
        {
            title      : 'good 5',
            image      : 'https://images-na.ssl-images-amazon.com/images/I/51vQPMq1MCL._SX342_QL70_.jpg',
            description: 'Euismod fames id lectus aenean nibh pretium hendrerit blandit enim etiam euismod vulputate maecenas id, dictumst mi dui taciti convallis cursus turpis cubilia dolor facilisis lorem quisque facilisis nibh ligula fermentum faucibus convallis ipsum netus.'
        },
    ]).then(() => {
        console.log('inserted');
        dbManger.db.close();
    }).catch(console.error);
});
