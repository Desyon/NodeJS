/**
 * Created by Desyon on 05.05.2017.
 */

// TODO: Getters for user specific content
// TODO: indexing

const winston = require('./util/winston');

let TingoDB = require('tingodb')();
let db = new TingoDB.Db('./src/server/database', {});

let users = db.collection('user.db');
let events = db.collection('event.db');
let categories = db.collection('category.db');

// Inserts
/**
 * Inserts a new user to the collection users, with the given data.
 * @param user JSON object of all user data to be inserted
 * @param res response to answer
 */
module.exports.insertUser = function (user, res) {
  winston.debug('User insertion called');

  users.createIndex({"username": user.username}, {unique: true});
  users.insert(user, function (err) {
    res(err);
  });
};

/**
 * Inserts a new event to the collection events, with the given data.
 * @param event JSON object of all event data to be inserted
 * @param res response to answer
 */
module.exports.insertEvent = function (event, res) {
  events.insert(event, function (err) {
    res(err);
  });
};

/**
 * Inserts a new category to the collection categories, with the given data.
 * @param category JSON object of all category data to be inserted
 * @param res response to answer
 */
module.exports.insertCategory = function (category, res) {
  categories.insert(category, function (err) {
    res(err);
  });
};

// Getter
/**
 * Gets one user by his unique username. Returns one object as JSON
 * @param username Key of the element to be found.
 * @param res Response
 */
module.exports.getUser = function (username, res) {
  users.findOne({'username': username}, function (err, item) {
    res(err, item);
  });
};

/**
 * Gets one event by his unique ID. Returns one object as JSON
 * @param id Key of the element to be found.
 * @param res Response
 */
module.exports.getEvent = function (id, res) {
  users.findOne({'_id': id}, function (err, item) {
    res(err, item);
  });
};

/**
 * Gets one Category by his unique ID. Returns one object as JSON
 * @param id Key of the element to be found.
 * @param res Response
 */
module.exports.getCategory = function (id, res) {
  users.findOne({'_id:': id}, function (err, item) {
    res(err, item);
  });
};

/**
 * Retrieves all events of one specific given user as a JSON list.
 * @param user user to retrieve all events for
 * @param res Response
 */
module.exports.getAllEvents = function (user, res) {
  // TODO: implement dis
};

/**
 * Retrieves all categories of one specific given user as a JSON list.
 * @param user user to retrieve all categories for
 * @param res Response
 */
module.exports.getAllCategories = function (user, res) {
  // TODO: implement dis
};

// Delete
/**
 * Deletes the user with the given username.
 * @param username Username of the user to be deleted
 * @param res Response
 */
module.exports.deleteUser = function (username, res) {
  users.remove({'username': username}, {w: 1}, function (err, result) {
    res(err, result);
  });
};

/**
 * Deletes the event with the given ID.
 * @param id ID of the event to be deleted.
 * @param res Response
 */
module.exports.deleteEvent = function (id, res) {
  events.remove({'_id': id}, {w: 1}, function (err, result) {
    res(err, result);
  });
};

/**
 * Deletes the category with the given ID.
 * @param id ID of the category to be deleted.
 * @param res Response
 */
module.exports.deleteCategory = function (id, res) {
  categories.remove({'_id': id}, {w: 1}, function (err, result) {
    res(err, result);
  });
};


/* DANGERZONE */

module.exports.initUserDB = function (res) {
  users.drop(function () {
    users = db.createCollection('user.db', {autoIndexId: false}, function () {
      users.createIndex({"username": 1}, {unique: true}, function (userErr) {
        res(userErr);
      });
    });
  });
  winston.debug('User DB created');
};

module.exports.initEventDB = function (res) {
  events.drop(function () {
    events = db.createCollection('event.db', {autoIndexId: true},
        function (eventErr) {
          return res(eventErr);
        });
  });
  winston.debug('Event DB created');
};

module.exports.initCategoryDB = function (res) {
  categories.drop(function () {
    categories = db.createCollection('category.db', {autoIndexId: true},
        function (catErr) {
          return res(catErr);
        });
  });
  winston.debug('Category DB created');
};