/**
 * Created by Desyon on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();
const winston = require('../util/winston');
const jwt = require('../util/tokenmanager');

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
  winston.debug('Event creation requested.');
  let error;

  if (!(req.get('authorization'))) {
    winston.debug('Event creation failed with missing authorization.');
    error = 'Authorization missing.';
    return res.status(401).send(error);
  }

  // token validation
  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Event creation failed with invalid authorization.');
      error = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    // content type validation
    if ('application/json' !== req.get('content-type')) {
      winston.debug(
          'Event creation failed with wrong or missing content type.');
      error = 'Wrong content type. Application only consumes JSON.';
      return res.status(406).send(error);
    }

    if (!req.body) {
      winston.debug('Event creation failed with missing request body.');
      error = 'Request body missing. Event creation failed.';
      return res.status(400).send(error);
    }

    let event = {};
    event.title = req.body.title;
    event.start = req.body.start;
    event.end = req.body.end;
    event.allday = req.body.allday;
    event.category = req.body.category;
    event.owner = decoded.user;
    event.location = req.body.location;
    event.notes = req.body.notes;

    if (undefined === event.title || undefined === event.start ||
        undefined === event.end || undefined === event.allday ||
        undefined === event.category || undefined === event.owner) {
      winston.debug('Event creation failed with missing mandatory properties.');
      error = 'Mandatory fields missing. Event creation rejected';
      return res.status(422).send(error);
    }

    db.insertEvent(event, function (insertErr) {
      if (insertErr) {
        winston.debug('Event creation failed with database Error.');
        return res.status(500).send(insertErr);
      } else {
        winston.debug('Event creation successful.');
        return res.sendStatus(201);
      }
    });
  });
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
  winston.debug('Event change requested.');
  let error;

  if (!(req.get('authorization'))) {
    winston.debug('Event change failed with missing authorization.');
    error = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Event change failed with invalid authorization.');
      error = 'Authorization failed. Invalid token.';
      return res.status(401).send(error);
    } else {
      // content type validation
      if ('application/json' !== req.get('content-type')) {
        winston.debug('Event change failed with wrong content type.');
        error = 'Wrong content type. Application only consumes JSON.';
        return res.status(406).send(error);
      }

      if (!req.body) {
        winston.debug('Event change failed with missing request body.');
        error = 'Request body missing. Event update failed.';
        return res.status(400).send(error);
      }

      let id = req.params.id;
      let event = {};

      event.title = req.body.title;
      event.start = req.body.start;
      event.end = req.body.end;
      event.allday = req.body.allday;
      event.category = req.body.category;
      event.location = req.body.location;
      event.notes = req.body.notes;

      db.getEvent(id, function (getErr, ret) {
        if (getErr) {
          winston.debug('Event change failed with missing event.');
          error = 'Could not find event.';
          return res.status(404).send(error);
        } else if (ret.owner !== decoded.user) {
          winston.debug('Event change failed with wrong owner.');
          return res.sendStatus(403);
        } else {
          db.updateEvent(id, event, function (updateErr) {
            if (updateErr) {
              winston.debug('Event change failed with database error.');
              return res.status(500).send(updateErr);
            } else {
              winston.debug('Event change successful.');
              return res.sendStatus(200);
            }
          });
        }
      });
    }
  });
});

/*
 * The sequence of the get methods must not be changed. Otherwise the API calls
 * will not work as intended
 */

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
  winston.debug('All events requested.');
  let error;

  if (!(req.get('authorization'))) {
    winston.debug('Event request failed with missing authorization.');
    error = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Event request failed with invalid authorization.');
      error = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let user = decoded.user;

    winston.debug('Event request for user \'' + user + '\',');

    db.getUserEvents(user, function (getErr, ret) {
      if (getErr) {
        winston.debug('Event request failed with database error.');
        error = 'Database error.';
        return res.status(500).send(error);
      } else {
        winston.debug('Event request successful.');
        return res.status(200).send(ret);
      }
    });
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
  winston.debug('Event request.');
  let error;

  if (!(req.get('authorization'))) {
    winston.debug('Event request failed with missing authorization');
    error = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || decoded === null || decoded === undefined) {
      winston.debug('Event request failed with invalid authorization.');
      error = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let id = req.params.id;

    winston.debug('Event request for event \'' + id + '\'.');

    db.getEvent(id, function (err, ret) {
      if (err) {
        winston.debug('Event request failed with database error.');
        return res.status(500).send(err);
      } else if (!ret) {
        winston.debug('Event request failed with missing event.');
        error = 'Event not found.';
        return res.status(404).send(error);
      } else if (decoded.user !== ret.owner) {
        winston.debug('Event request failed with wrong user.');
        res.sendStatus(403);
      } else {
        winston.debug('Event request successful.');
        return res.status(200).send(ret);
      }
    });
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
  winston.debug('Event deletion requested.');
  let error;

  if (!(req.get('authorization'))) {
    winston.debug('Event deletion failed with missing authorization');
    error = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || decoded === null || decoded === undefined) {
      winston.debug('Event deletion failed with invalid authorization');
      error = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let id = req.params.id;

    winston.debug('Event deletion requested for event \'' + id + '\'.');

    db.getEvent(id, function (getErr, ret) {
      if (!ret) {
        winston.debug('Event deletion failed with missing event.');
        error = 'Event not found.';
        return res.status(404).send(error);
      } else if (decoded.user !== ret.owner) {
        winston.debug('Event deletion failed with wrong user.');
        return res.sendStatus(403);
      } else {
        db.deleteEvent(id, function (delErr) {
          if (delErr) {
            winston.debug('Event deletion failed with database error.');
            return res.status(500).send(delErr);
          } else {
            winston.debug('Event deletion successful.');
            return res.sendStatus(200);
          }
        });
      }
    });
  });
});

module.exports = router;
