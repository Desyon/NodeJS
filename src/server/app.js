'use strict';
/**
 * Created by Desyon on 07.04.2017.
 */

const express = require('express');
const cors = require('cors');
const winston = require('./util/winston');

const rootRouter = require('./routers/root');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const categoryRouter = require('./routers/category');

// listening port
const httpPort = 3000;

const app = express();

app.use('*', cors());

// set up routers/services
app.use('/', rootRouter);

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);

// set up ap to listen on port + test logging.
app.listen(httpPort, function () {
  winston.info('Now listening on localhost: ' + httpPort);

  // remove comments to test logging
  // winston.error('Test error.');
  // winston.warn('Test warning');
  // winston.info('Test info');
  // winston.verbose('Test verbose message');
  // winston.debug('Test debug message');
  // winston.silly('Test silly message');
});

