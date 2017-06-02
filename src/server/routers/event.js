/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();

const db = require('../db');

const router = express.Router();

/**
 * Handles POST requests on /event/create, and tries to create an event with the
 * given request data.
 *
 * Validates multiple headers and checks if all mandatory fields have a value.
 * If not sends a corresponding HTTP error code and and an error message.
 *
 * Responds with HTTP status code 201 if successful.
 */
router.post('/create', bodyParser, function (req, res) {
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

  if (undefined === event.title || undefined === event.date ||
      undefined === event.time || undefined === event.allday ||
      undefined === event.category || undefined === event.owner) {
    return res.status(422).send(
        'Mandatory fields missing. Event creation rejected.');
  }

  db.insertEvent(event, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.sendStatus(201);
    }
  });
});

/**
 * Handles GET request on /event/all with a given session token (identifying a
 * user) to receive all events the given user owns.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with a JSON list of the events if successful.
 */
router.get('/all', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  // TODO: Implement
});

/**
 * Handles PUT request to /event/:id, to update the given event.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the update is successful.
 */
router.put('/:id', bodyParser, function (req, res) {
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
      return res.sendStatus(200);
    }
  });
});

/**
 * Handles GET request to /event/:id, to receive all saved information about the
 * event.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with JSON element of the event if successful.
 */
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
    } else if (!ret) {
      error = 'Event not found.';
      return res.status(404).send(error);
    } else {
      return res.status(200).send(ret);
    }
  });
});

/**
 * Handles DELETE request to /event/:id, to delete the given event.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the delete is successful.
 */
router.delete('/:id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  let id = req.params.id;

  db.getEvent(id, function (getErr, ret) {
    if (!ret) {
      error = 'Event not found.';
      return res.status(404).send(error);
    } else {
      db.deleteEvent(id, function (delErr) {
        if (delErr) {
          return res.status(500).send(delErr);
        } else {
          return res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
