/**
 * Created by Desyon on 05.05.2017.
 */

// TODO: Getters for user specific content
// TODO: indexing

let TingoDB = require('tingodb')().Db;
let db = new TingoDB('./database');

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
  users.insert(user, function (err) {
    res.send(err);
  });
};

/**
 * Inserts a new event to the collection events, with the given data.
 * @param event JSON object of all event data to be inserted
 * @param res response to answer
 */
module.exports.insertEvent = function (event, res) {
  events.insert(event, function (err) {
    res.send(err);
  });
};

/**
 * Inserts a new category to the collection categories, with the given data.
 * @param category JSON object of all category data to be inserted
 * @param res response to answer
 */
module.exports.insertCategory = function (category, res) {
  categories.insert(category, function (err) {
    res.send(err);
  });
};

// Getter
/**
 * Gets one user by his unique username. Returns one object as JSON
 * @param key Key of the element to be found.
 * @param res Response
 */
module.exports.getUser = function (key, res) {
  users.findOne({'uname': key}, function (err, item) {
    res.send(err, item);
  });
};

/**
 * Gets one event by his unique ID. Returns one object as JSON
 * @param key Key of the element to be found.
 * @param res Response
 */
module.exports.getEvent = function (key, res) {
  users.findOne({'_id': key}, function(err, item) {
    res.send(err, item);
  });
};

/**
 * Gets one Category by his unique ID. Returns one object as JSON
 * @param key Key of the element to be found.
 * @param res Response
 */
module.exports.getCategory = function (key, res) {
  users.findOne({'_id:': key}, function (err, item) {
    res.send(err, item);
  });
};

// Delete
/**
 * Deletes the user with the given username.
 * @param uname Username of the user to be deleted
 * @param res Response
 */
module.exports.deleteUser = function (uname, res) {
  users.remove({'uname': uname}, {w: 1}, function (err, result) {
    res.send(err, result);
  });
};

/**
 * Deletes the event with the given ID.
 * @param id ID of the event to be deleted.
 * @param res Response
 */
module.exports.deleteEvent = function (id, res) {
  events.remove({'_id': id}, {w: 1}, function (err, result) {
    res.send(err, result);
  });
};

/**
 * Deletes the category with the given ID.
 * @param id ID of the category to be deleted.
 * @param res Response
 */
module.exports.deleteCategory = function (id, res) {
  categories.remove({'_id': id}, {w: 1}, function (err, result) {
    res.send(err, result);
  });
};
