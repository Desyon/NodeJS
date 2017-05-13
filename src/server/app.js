/**
 * Created by Desyon on 07.04.2017.
 */

const express = require('express');
const winston = require('./util/winston');

app = express();

app.get('/', function (req, res) {
  res.send('Hello World from root');
});

app.get('/test', function (req, res) {
  res.send('Hello World from test.');
});

app.listen(3000, function () {
  winston.warn('Now listening on localhost:3000');
  winston.silly('This is really silly.');
  winston.error('Test error.');
});
