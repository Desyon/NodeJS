/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();
const winston = require('../util/winston');
const jwt = require('../util/tokenmanager');

const db = require('../db');

const router = express.Router();

/**
 * Handles POST request on /user/login for a login attempt.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if successful and transfers a session
 * token.
 */
router.post('/login', bodyParser, function (req, res) {
  let error;

  // content type validation
  if ('application/json' !== req.get('content-type')) {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  // check if body is not empty
  if (!req.body) {
    error = 'Request body missing. Login failed.';
    return res.status(400).send(error);
  }

  let user = {};
  user.username = req.body.username;
  user.password = req.body.password;

  // check if username and password are contained in body
  if (undefined === user.username || undefined === user.password) {
    error = 'Username or password missing.';
    return res.status(422).send(error);
  }

  db.getUser(user.username, function (err, ret) {
    if (err) {
      error = 'User not found.';
      return res.status(404).send(error);
    } else {
      if (ret.password !== user.password) {
        winston.verbose('Failed login attempt by user ' + username);
        return res.sendStatus(401);
      }
      winston.verbose('User \'' + user.username + '\' successfully logged in.');
      let token = jwt.sign(user.username);
      return res.status(200).send(token);
    }
  });
});

/**
 * Handles POST requests on /user/create, and tries to create a user with the
 * given request data.
 *
 * Validates multiple headers and checks if all mandatory fields have a value.
 * If not sends a corresponding HTTP error code and and error message.
 *
 * Responds with HTTP status code 201 if successful.
 */
router.post('/create', bodyParser, function (req, res) {
  let error;

  // content type validation
  if ('application/json' !== req.get('content-type')) {
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

  if (undefined === user.username || undefined === user.password) {
    error = 'Mandatory fields missing. User Creation rejected.';
    return res.status(422).send(error);
  }

  db.insertUser(user, function (err) {
    if (err) {
      winston.verbose('User creation failed. ' + err.errmsg);
      return res.status(500).send(err);
    } else {
      winston.verbose('User \'' + user.username + '\' created');
      return res.sendStatus(201);
    }
  });
});

/**
 * Handles PUT request to /user/:id, to update the given user.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the update is successful.
 */
router.put('/:id', bodyParser, function (req, res) {
  let error;

  if (!(req.get('authorization'))) {
    error = 'Authorization missing';
    return res.status(401).send(error);
  }

  let username = req.params.id;

  // token validation
  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded || decoded.user !== username) {
      error = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }
  });

  // content type validation
  if ('application/json' !== req.get('content-type')) {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. User updating failed';
    return res.status(400).send(error);
  }

  let user = {};
  user.name = req.body.name;
  user.password = req.body.password;
  user.dob = req.body.dob;
  user.email = req.body.email;

  db.updateUser(username, req.body, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      winston.verbose('User \'' + username + '\' updated');
      return res.sendStatus(200);
    }
  });
});

/**
 * Handles DELETE request to /user/:id, to delete the given user.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the delete is successful.
 */
router.delete('/:id', bodyParser, function (req, res) {
  let error;

  if (!(req.get('authorization'))) {
    error = 'Authorization missing';
    return res.status(401).send(error);
  }

  let username = req.params.id;

  // token validation
  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded || decoded.user !== username) {
      error = 'Authorization failed. Invalid token.';
      return res.status(401).send(error);
    }
  });

  db.getUser(username, function (err, ret) {
    if (!ret) {
      error = 'User not found';
      return res.status(404).send(error);
    } else {
      db.deleteUser(username, function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send('User ' + username + ' deleted.');
        }
      });
    }
  });
});

module.exports = router;
