/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();

const db = require('../db');

const router = express.Router();

// /all route
router.post('/all', bodyParser, function (req, res) {
  res.send('POST on /event/all --> create event');
});

router.get('/all', bodyParser, function (req, res) {
  res.send('GET on /event/all --> return all events');
});

// /:id route
router.put('/;id', bodyParser, function (req, res) {
  res.send('PUT on /event/' + req.params.id + ' --> update event with id');
});

router.delete('/:id', bodyParser, function (req, res) {
  res.send('DELETE on /event/' + req.params.id + ' --> delete event with id');
});

router.get('/:id', bodyParser, function (req, res) {
  res.send('GET on /event/' + req.params.id + ' --> return event with id');
});

module.exports = router;
