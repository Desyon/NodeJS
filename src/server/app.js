/**
 * Created by Desyon on 07.04.2017.
 */

const express = require('express');
const winston = require('./util/winston');

const db = require('./db');

const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const categoryRouter = require('./routers/category');

const httpPort = 3000;

app = express();

// routes
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

app.get('/setup', function (req, res) {
  db.initUserDB(function (userCB) {
    if(userCB) {
      return res.send(500).send('User database creation failed');
    }
  });

  db.initEventDB(function (eventCB) {
    if(eventCB) {
      return res.send(500).send('Event database creation failed');
    }
  });

  db.initCategoryDB(function (catCB) {
    if(catCB) {
      return res.send(500).send('Category databases creation failed');
    }
  });

  return res.status(201).send('Databases created');
});