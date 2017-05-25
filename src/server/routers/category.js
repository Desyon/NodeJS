/**
 * Created by Til on 06.05.2017.
 */

const express = require('express');
const bodyParser = require('body-parser').json();

const db = require('../db');

const router = express.Router();

// /all route
router.post('/create', bodyParser, function (req, res) {
  let error;

  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. Category creation failed.';
    return res.status(400).send(error);
  }

  let category = {};
  category.name = req.body.name;
  category.color = req.body.color;
  category.description = req.body.description;
  category.owner = req.body.owner;

  db.insertCategory(category, function (err, category) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(category);
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

  // TODO: Implementation
});

// /:id route
router.put('/:id', bodyParser, function (req, res) {
  let error;

  // check for correct content type
  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  if (!req.body) {
    error = 'Request body missing. Category update failed.';
    return res.status(400).send(error);
  }

  let id = req.params.id;
  let category = {};

  category.name = req.body.name;
  category.color = req.body.color;
  category.description = req.body.description;
  category.owner = req.body.owner;

  db.updateCategory(id, event, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send('Category updated');
    }
  });
});

router.get('/:id', bodyParser, function (req, res) {
  let error;

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

  if (req.get('content-type') !== 'application/json') {
    error = 'Wrong content type. Application only consumes JSON.';
    return res.status(406).send(error);
  }

  let categoryId = req.params.id;

  db.deleteCategory(categoryId, function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.sendStatus(200);
    }
  });
});

module.exports = router;
