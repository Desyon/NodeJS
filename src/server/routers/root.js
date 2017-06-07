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
router.get('/administration/init', function (req, res) {
  db.initUserDB(function (userError) {
    if (userError) {
      return res.status(500).send('User database creation failed');
    }
  });

  db.initEventDB(function (eventError) {
    if (eventError) {
      return res.status(500).send('Event database creation failed');
    }
  });

  db.initCategoryDB(function (catError) {
    if (catError) {
      return res.status(500).send('Category databases creation failed');
    }
  });

  return res.status(201).send('Databases created');
});

/**
 * Drops all databases and redirects to the init route to set them up again.
 * Do not use twice at once. Otherwise the server might crash.
 */
router.get('/administration/delete', function (req, res) {
  let error;

  if (!req.get('authorization')) {
    error = 'Authorization missing. Reset rejected.';
    return res.status(401).send(error);
  }

  if ('admin' !== req.get('authorization')) {
    error = 'Invalid authorization. Reset rejected';
    return res.status(401).send(error);
  }

  db.deleteUserDB(function (userErr) {
    if (userErr) {
      return res.status(500).send(userErr);
    }
  });

  db.deleteEventDB(function (eventError) {
    if (eventError) {
      return res.status(500).send(eventError);
    }
  });

  db.deleteCategoryDB(function (catError) {
    if (catError) {
      return res.status(500).send(catError);
    }
  });

  return res.status(200).send('Databases Deleted.');
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
