/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();

const db = require('../db');

const router = express.Router();

// /all route
router.post('/all', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. Event creation failed.';
    return res.status(400).send(error);
  }

  let event = {};
  event.title = req.body.title;
  event.date = req.body.date;
  event.time = req.body.time;
  event.allday = req.body.allday;
  event.category = req.body.category;
  event.owner = req.body.owner;
  event.location = req.body.location;
  event.notes = req.body.notes;

  db.insertEvent(event, function (err, ret) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send('Event created');
    }
  });
});

router.get('/all', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  // TODO: Implement
});

// /:id route
router.put('/;id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. Event update failed.';
    return res.status(400).send(error);
  }

  let id = req.params.id;
  let event = {};
  event.title = req.body.title;
  event.date = req.body.date;
  event.time = req.body.time;
  event.allday = req.body.allday;
  event.category = req.body.category;
  event.owner = req.body.owner;
  event.location = req.body.location;
  event.notes = req.body.notes;

  db.updateEvent(id, event, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(200);
    }
  });
});

router.get('/:id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  let id = req.params.id;

  db.getEvent(id, function (err, ret) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(ret);
    }
  });
});

router.delete('/:id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  let id = req.params.id;

  db.deleteEvent(id, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200);
    }
  });
});

module.exports = router;
