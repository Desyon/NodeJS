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

  db.getUser(user.username, function (err, ret) {
    if (err) {
      error = 'User not found';
      return res.status(404).send(error);
    } else {
      if (ret.password !== user.password) {
        return res.sendStatus(401);
      }
      return res.status(200).send(ret);
    }
  });
});

router.post('/create', bodyParser, function (req, res) {
  let error;
  winston.debug('User creation requested');

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  // check if body is not empty
  if (!req.body) {
    error = 'Request body missing. User creation failed';
    return res.status(400).send(error);
  }

  let user = {};
  user.username = req.body.username;
  user.name = req.body.name;
  user.password = req.body.password;
  user.dob = req.body.dob;
  user.email = req.body.email;

  db.insertUser(user, function (err, ret) {
    if (err) {
      winston.debug('User creation failed. ' + err.errmsg);
      return res.status(500).send(err.errmsg);
    } else {
      winston.debug('User \'' + user.username + '\' created');
      return res.status(201).send('User created');
    }
  });
});

// /:id route
router.put('/:id', bodyParser, function (req, res) {
  db.updateUser(req.params.id, req.body, function (err) {
    if (err) {
      return res.sendStatus(500);
    } else {
      return res.sendStatus(200);
    }
  });
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
