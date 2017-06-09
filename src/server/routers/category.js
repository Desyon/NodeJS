'use strict';
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
 * Handles POST requests on /category/create, and tries to create a category
 * with the given request data.
 *
 * Validates multiple headers and checks if all mandatory fields have a value.
 * If not sends a corresponding HTTP error code and and an error message.
 *
 * Responds with HTTP status code 201 if successful.
 */
router.post('/create', bodyParser, function (req, res) {
  winston.debug('Category creation requested.');
  let error = {};

  if (!(req.get('authorization'))) {
    winston.debug('Category creation failed with missing authorization.');
    error.errmsg = 'Authorization missing.';
    return res.status(401).send(error);
  }

  // token validation
  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Category creation failed with invalid authorization.');
      error.errmsg = 'Authorization failed. Invalid token.';
      return res.status(401).send(error);
    }

    // content type validation
    if ('application/json' !== req.get('content-type')) {
      winston.debug(
          'Category creation failed with wrong or missing content type.');
      error.errmsg = 'Wrong content type. Application only consumes JSON.';
      return res.status(406).send(error);
    }

    if (!req.body) {
      winston.debug('Category creation failed with missing request body.');
      error.errmsg = 'Request body missing. Category creation failed.';
      return res.status(400).send(error);
    }

    let category = {};
    category.name = req.body.name;
    category.color = req.body.color;
    category.description = req.body.description;
    category.owner = decoded.user;

    if (undefined === category.name || undefined === category.color ||
        undefined === category.owner) {
      winston.debug(
          'Category creation failed with missing mandatory properties.');
      error.errmsg = 'Mandatory fields missing. Category creation rejected.';
      return res.status(422).send(error);
    }

    db.insertCategory(category, function (err) {
      if (err) {
        winston.debug('Category creation failed with database error.');
        return res.status(500).send(err);
      } else {
        winston.debug('Category creation successful.');
        let response = {msg: 'Category created'};
        return res.status(201).send(response);
      }
    });
  });
});

/**
 * Handles PUT request to /category/:id, to update the given category.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the update is successful.
 */
router.put('/:id', bodyParser, function (req, res) {
  winston.debug('Category change requested.');
  let error = {};

  if (!(req.get('authorization'))) {
    winston.debug('Category change failed with missing authorization.');
    error.errmsg = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Category change failed with invalid authorization.');
      error.errmsg = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    } else {
      // content type validation
      if ('application/json' !== req.get('content-type')) {
        winston.debug(
            'Category change failed with wrong or missing content type.');
        error.errmsg = 'Wrong content type. Application only consumes JSON.';
        return res.status(406).send(error);
      }

      if (!req.body) {
        winston.debug('Category change failed with missing request body.');
        error.errmsg = 'Request body missing. Event update failed.';
        return res.status(400).send(error);
      }

      let categoryId = req.params.id;
      let category = {};

      category.name = req.body.name;
      category.color = req.body.color;
      category.description = req.body.description;

      winston.debug(
          'Category change requested for category \'' + categoryId + '\'.');
      db.getCategory(categoryId, function (getErr, ret) {
        if (getErr) {
          winston.debug('Category change failed with missing category.');
          error.errmsg = 'Could not find category';
          return res.status(404).send(error);
        } else if (ret.owner !== decoded.user) {
          winston.debug('Category change failed with due to wrong owner.');
          return res.sendStatus(403);
        } else {
          db.updateCategory(categoryId, category, function (updateErr) {
            if (updateErr) {
              winston.debug('Category change failed with database error.');
              return res.status(500).send(updateErr);
            } else {
              winston.debug('Category change successful.');
              let response = {msg: 'Success'};
              return res.status(200).send(response);
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
 * Handles GET request on /category/all with a given session token (identifying
 * a user) to receive all events the given user owns.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with a JSON list of the categories if successful.
 */
router.get('/all', bodyParser, function (req, res) {
  winston.debug('All categories requested.');
  let error = {};

  if (!(req.get('authorization'))) {
    winston.debug('Category request failed with missing authorization.');
    error.errmsg = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Category request failed with invalid authorization.');
      error.errmsg = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let user = decoded.user;

    winston.debug('All categories for user \'' + user + '\' requested.');

    db.getUserCategories(user, function (getErr, ret) {
      if (getErr) {
        winston.debug('Category request failed with database error');
        error.errmsg = 'Database error.';
        return res.status(500).send(error);
      } else {
        winston.debug('Category request successful');
        return res.status(200).send(ret);
      }
    });
  });
});

/**
 * Handles GET request to /category/:id, to receive all saved information about
 * the category.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with JSON element of the event if successful.
 */
router.get('/:id', bodyParser, function (req, res) {
  winston.debug('Category request.');
  let error = {};

  if (!(req.get('authorization'))) {
    winston.debug('Category request failed with missing authorization.');
    error.errmsg = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Category request failed with invalid authorization.');
      error.errmsg = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let id = req.params.id;

    winston.debug('Category request for category \'' + id + '\'.');

    db.getCategory(id, function (getErr, ret) {
      if (getErr) {
        winston.debug('Category request failed with database error');
        return res.status(500).send(getErr);
      } else if (!ret) {
        winston.debug('Category request failed as category was not found');
        error.errmsg = 'Category not found';
        return res.status(404).send(error);
      } else if (decoded.user !== ret.owner) {
        winston.debug('Category request failed with wrong user');
        return res.sendStatus(403);
      } else {
        winston.debug('Category request successful.');
        return res.status(200).send(ret);
      }
    });
  });
});

/**
 * Handles DELETE request to /category/:id, to delete the given category.
 *
 * Validates headers and checks given request data. If an error occurs a
 * corresponding HTTP error code is sent.
 *
 * Responds with HTTP status code 200 if the delete is successful.
 */
router.delete('/:id', bodyParser, function (req, res) {
  winston.debug('Category deletion requested');
  let error = {};

  if (!(req.get('authorization'))) {
    winston.debug('Category deletion failed with missing authorization.');
    error.errmsg = 'Authorization missing.';
    return res.status(401).send(error);
  }

  jwt.verify(req.get('authorization'), function (err, decoded) {
    if (err || !decoded) {
      winston.debug('Category deletion failed with invalid authorization.');
      error.errmsg = 'Authorization failed. Invalid token';
      return res.status(401).send(error);
    }

    let categoryId = req.params.id;

    winston.debug(
        'Category deletion requested for category \'' + categoryId + '\'.');

    db.getCategory(categoryId, function (getErr, ret) {
      if (!ret) {
        winston.debug('Category deletion failed as category was not found');
        error.errmsg = 'Category not found';
        return res.status(404).send(error);
      } else if (decoded.user !== ret.owner) {
        winston.debug('Category deletion failed with wrong user');
        return res.sendStatus(403);
      } else {
        db.deleteCategory(categoryId, function (delErr) {
          if (delErr) {
            winston.debug('Category deletion failed with database error');
            return res.status(500).send(delErr);
          } else {
            winston.debug('Category deletion successful.');
            let response = {msg: 'Category deleted'};
            return res.status(200).send(response);
          }
        });
      }
    });
  });
});

module.exports = router;
