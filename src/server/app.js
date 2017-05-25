/**
 * Created by Desyon on 07.04.2017.
 */

const express = require('express');
const winston = require('./util/winston');

const rootRouter = require('./routers/root');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const categoryRouter = require('./routers/category');

const httpPort = 3000;

app = express();

// set up routers/services
app.use('/', rootRouter);

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);

// set listening port
app.listen(httpPort, function () {
  winston.info('Now listening on localhost: ' + httpPort);

  // remove comments to test logging

  // winston.error('Test Error');
  // winston.warn('Test Warining');
  // winston.info('Test Info');
  // winston.verbose('Test Verbose Message');
  // winston.debug('Test Debug Message');
  // winston.silly('Test Silly Message');
});

