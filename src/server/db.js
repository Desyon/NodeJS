/**
 * Created by Desyon on 05.05.2017.
 */

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
  users.createIndex({'username': 1}, {unique: true});
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

// Update
module.exports.updateUser = function (username, user, res) {
  users.update({username: username}, user, function (ret) {
    res(ret);
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

/* ------------------------ Database Initialization ------------------------ */
/**
 * Creates a user database and defines the username as unique index.
 * Sends out the error message if unsuccessful.
 * @param res Response.
 */
module.exports.initUserDB = function (res) {
  users = db.createCollection('user.db', {autoIndexId: false}, function () {
    users.createIndex({'username': 1}, {unique: true}, function (error) {
      return res(error);
    });
  });
  winston.debug('User database created');
};

/**
 * Creates a category database and defines automatic id generation.
 * Sends out the error message if unsuccessful.
 * @param res Response.
 */
module.exports.initEventDB = function (res) {
  events = db.createCollection('event.db', {autoIndexId: true},
      function (error) {
        return res(error);
      });
  winston.debug('Event database created');
};

/**
 * Creates a category database and defines automatic id generation.
 * Sends out the error message if unsuccessful.
 * @param res Response.
 */
module.exports.initCategoryDB = function (res) {
  categories = db.createCollection('category.db', {autoIndexId: true},
      function (error) {
        return res(error);
      });
  winston.debug('Category database created');
};

/**
 * Deletes the user database. Sends out the error message if unsuccessful.
 * @param res Response
 */
module.exports.deleteUserDB = function (res) {
  users.drop(function (error) {
    return res(error)
  });
  winston.debug('User database deleted');
};

/**
 * Deletes the event database. Sends out the error message if unsuccessful
 * @param res Response
 */
module.exports.deleteEventDB = function (res) {
  events.drop(function (error) {
    return res(error)
  });
  winston.debug('Event database deleted');
};

/**
 * Deletes the category database. Sends out the error message if unsuccessful
 * @param res Response
 */
module.exports.deleteCategoryDB = function (res) {
  categories.drop(function (error) {
    return res(error)
  });
  winston.debug('Category database deleted');
};
