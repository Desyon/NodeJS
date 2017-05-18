/**
 * Created by Desyon on 07.04.2017.
 */

const express = require('express');
const winston = require('./util/winston');

const db = require('./db');

const administrationRouter = require('./routers/administration');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const categoryRouter = require('./routers/category');

const httpPort = 3000;

app = express();

// routes
app.use('/administration', administrationRouter);

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);

app.listen(httpPort, function () {
  winston.info('Now listening on localhost: ' + httpPort);
  winston.silly('This is really silly.');
});

// Easter Egg HTTP Error Code 418: I'm a tea pot

app.get('*/teapot|*/coffee', function (req, res) {
  console.log('No coffee for you. Sorry.');
  res.sendStatus(418);
});