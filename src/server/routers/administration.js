/**
 * Created by Til on 18.05.2017.
 */

const express = require('express');
const winston = require('../util/winston');

const db = require('../db');

const router = express.Router();

router.get('/init', function (req, res) {
  db.initUserDB(function (userError) {
    if (userError) {
      return res.send(500).send('User database creation failed');
    }
  });

  db.initEventDB(function (eventError) {
    if (eventError) {
      return res.send(500).send('Event database creation failed');
    }
  });

  db.initCategoryDB(function (catError) {
    if (catError) {
      return res.status(500).send('Category databases creation failed');
    }
  });

  return res.status(201).send('Databases created');
});

router.get('/reset', function (req, res) {
  db.deleteUserDB(function (userErr) {
    if (userErr) {
      res.status(500).send(userErr);
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

  return res.redirect('/administration/init');
});

module.exports = router;