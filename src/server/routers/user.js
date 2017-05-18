/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();
const winston = require('../util/winston');

const db = require('../db');

const router = express.Router();

/**
 * Handles POST request on /user/login for a login attempt.
 */
router.post('/login', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  // check if body is not empty
  if (!req.body) {
    error = 'Request body missing. Login failed';
    return res.status(400).send(error);
  }

  let user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  // check if username and password are contained in body
  if (user.username === undefined || user.password === undefined) {
    error = 'Username or password missing.';
    return res.status(422).send(error);
  }

  db.getUser(user.username, function (err, user) {
    if (err) {
      error = 'User not found';
      return res.status(404).send(error);
    } else {
      return res.status(200).send(user);
    }
  });
});

router.post('/create', bodyParser, function (req, res) {
  let error;
  winston.debug('Create user called');

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }
  winston.debug('Content type check passed');

  // check if body is not empty
  if (!req.body) {
    error = 'Request body missing. User creation failed';
    return res.status(400).send(error);
  }
  winston.debug('Request body found');

  let user = {};
  user.username = req.body.username;
  user.name = req.body.name;
  user.password = req.body.password;
  user.dob = req.body.dob;
  user.email = req.body.email;

  db.insertUser(user, function (err, ret) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(ret);
    }
  });
});

// /:id route
router.put('/:id', bodyParser, function (req, res) {
  res.send('PUT on user/' + req.params.id + ' --> account update');
});

router.delete('/:id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. Bad request.';
    return res.status(400).send(error);
  }
  res.send('DELETE on user/' + req.params.id + ' --> delete account');
});

module.exports = router;