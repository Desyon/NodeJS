'use strict';
/**
 * Created by Desyon on 18.05.2017.
 */

const express = require('express');
const winston = require('../util/winston');
const db = require('../db');

const router = express.Router();

/**
 * Initialization rout to recreate the databases after resetting them. Can also
 * be used for a first time setup.
 */
router.get('/administration/database', function (req, res) {
  db.initUserDB(function (userError) {
    if (userError) {
      return res.status(500).send('User database creation failed');
    } else {
      db.initEventDB(function (eventError) {
        if (eventError) {
          return res.status(500).send('Event database creation failed');
        } else {
          db.initCategoryDB(function (catError) {
            if (catError) {
              return res.status(500).send('Category databases creation failed');
            }
          });
        }
      });
    }
  });

  let response = {msg: 'Databases created'};
  return res.status(201).send(response);
});

/**
 * Drops all databases and redirects to the init route to set them up again.
 * Do not use twice at once. Otherwise the server might crash.
 */
router.delete('/administration/database', function (req, res) {
  let error = {};

  if (!req.get('authorization')) {
    error.errmsg = 'Authorization missing. Reset rejected.';
    return res.status(401).send(error);
  }

  if ('admin' !== req.get('authorization')) {
    error.errmsg = 'Invalid authorization. Reset rejected';
    return res.status(401).send(error);
  }

  db.deleteUserDB(function (userErr) {
    if (userErr) {
      winston.debug(userErr);
      return res.status(500).send(userErr);
    } else {
      db.deleteEventDB(function (eventError) {
        if (eventError) {
          return res.status(500).send(eventError);
        } else {
          db.deleteCategoryDB(function (catError) {
            if (catError) {
              return res.status(500).send(catError);
            }
          });
        }
      });
    }
  });

  let response = {msg: 'Databases deleted'};
  return res.status(200).send(response);
});

router.put('/administration/test', function (req, res) {
  let error = {};

  let user = {
    'username': 'someuser',
    'name': 'John Doe',
    'email': 'john@doe.com',
    'dob': '2017-06-10T22:00:00.000Z',
    'password': 'password',
  };

  db.insertUser(user, function (err) {
    if (err) {
      error.errmsg = 'Error creating user';
      return res.status(500).send(error);
    } else {
      let category = {
        'name': 'Awesome Events',
        'color': '#c0ffee',
        'owner': 'someuser',
        'description': 'Cool Stuff',
      };

      db.insertCategory(category, function (err) {
        if (err) {
          error.errmsg = 'Error creating category';
          return res.status(500).send(error);
        } else {
          let event = {
            'title': 'My Awesome Event',
            'startDate': 1496613600000,
            'startTime': 45420000,
            'endDate': 1496613600000,
            'endTime': 52560000,
            'owner': 'someuser',
            'category': 'Awesome Events',
            'location': 'Home',
            'notes': 'Definitely get some food before',
            'color': '#c0ffee',
          };

          db.insertEvent(event, function (err) {
            if (err) {
              error.errmsg = 'Error creating event';
              return res.status(500).send(error);
            }
          });
        }
      });
    }
  });

  let response = {msg: 'Sample data created successfully'};
  return res.status(201).send(response);
});

/**
 * Handles all GET requests ending on /teapot or /coffee and returns error code
 * 418 according to an april fools joke by the IETF referencing RFC 2324 (Hyper
 * Text Coffee Pot Protocol). This error is supposed to be returned by teapots t
 * hat are requested to brew coffee.
 */
router.get('*/teapot|*/coffee', function (req, res) {
  winston.warn('No coffee for you. Sorry.');
  res.sendStatus(418);
});

module.exports = router;
