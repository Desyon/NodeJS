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
 * @param callback response to answer
 */
module.exports.insertUser = function (user, callback) {
  users.createIndex({'username': 1}, {unique: true});
  users.insert(user, function (err) {
    callback(err);
  });
};

/**
 * Inserts a new event to the collection events, with the given data.
 * @param event JSON object of all event data to be inserted
 * @param callback response to answer
 */
module.exports.insertEvent = function (event, callback) {
  events.insert(event, function (err) {
    callback(err);
  });
};

/**
 * Inserts a new category to the collection categories, with the given data.
 * @param category JSON object of all category data to be inserted
 * @param callback response to answer
 */
module.exports.insertCategory = function (category, callback) {
  categories.insert(category, function (err) {
    callback(err);
  });
};

// Update
/**
 * Update function for users. Applies all changes given in the user object to
 * the document associated with the given username.
 * @param username username of the user to be updated
 * @param user JSON object with the user data to be changed
 * @param callback response
 */
module.exports.updateUser = function (username, user, callback) {
  users.update({username: username}, {$set: user}, {upsert: true}, function (err) {
    callback(err);
  });
};

/**
 * Update function for events. Applies all changes given in the event object to
 * the document associated with the given id.
 * @param id id of the user to be updated
 * @param event JSON object with the event data to be changed
 * @param callback response
 */
module.exports.updateEvent = function (id, event, callback) {
  events.update({_id: id}, {$set: event}, {upsert: true}, function (err) {
    callback(err);
  });
};

/**
 * Update function for categories. Applies all changes given in the category object to
 * the document associated with the given id.
 * @param id id of the user to be updated
 * @param category JSON object with the category data to be changed
 * @param callback response
 */
module.exports.updateCategory = function (id, category, callback) {
  categories.update({_id: id}, {$set: category}, {upsert: true}, function (err) {
    callback(err);
  });
};

// Getter
/**
 * Gets one user by his unique username. Returns one object as JSON
 * @param username Key of the element to be found.
 * @param callback Response
 */
module.exports.getUser = function (username, callback) {
  users.findOne({username: username}, function (err, item) {
    callback(err, item);
  });
};

/**
 * Gets one event by his unique ID. Returns one object as JSON
 * @param id Key of the element to be found.
 * @param callback Response
 */
module.exports.getEvent = function (id, callback) {
  events.findOne({_id: id}, function (err, item) {
    callback(err, item);
  });
};

/**
 * Gets one Category by his unique ID. Returns one object as JSON
 * @param id Key of the element to be found.
 * @param callback Response
 */
module.exports.getCategory = function (id, callback) {
  categories.findOne({_id: id}, function (err, item) {
    callback(err, item);
  });
};

/**
 * Retrieves all events of one specific given user as a JSON list.
 * @param user user to retrieve all events for
 * @param callback Response
 */
module.exports.getUserEvents = function (user, callback) {
  events.find({owner: user}).toArray(function (err, items) {
    callback(err, items);
  });
};

/**
 * Retrieves all categories of one specific given user as a JSON list.
 * @param user user to retrieve all categories for
 * @param callback Response
 */
module.exports.getUserCategories = function (user, callback) {
  categories.find({owner: user}).toArray(function (err, items) {
    callback(err, items);
  });
};

// Delete
/**
 * Deletes the user with the given username.
 * @param username Username of the user to be deleted
 * @param callback Response
 */
module.exports.deleteUser = function (username, callback) {
  users.remove({username: username}, {w: 1}, function (err, result) {
    callback(err, result);
  });
};

/**
 * Deletes the event with the given ID.
 * @param id ID of the event to be deleted.
 * @param callback Response
 */
module.exports.deleteEvent = function (id, callback) {
  events.remove({_id: id}, {w: 1}, function (err, result) {
    callback(err, result);
  });
};

/**
 * Deletes the category with the given ID.
 * @param id ID of the category to be deleted.
 * @param callback Response
 */
module.exports.deleteCategory = function (id, callback) {
  categories.remove({_id: id}, {w: 1}, function (err, result) {
    callback(err, result);
  });
};

/* ------------------------ Database Initialization ------------------------ */
/**
 * Creates a user database and defines the username as unique index.
 * Sends out the error message if unsuccessful.
 * @param callback Response.
 */
module.exports.initUserDB = function (callback) {
  users = db.createCollection('user.db', {autoIndexId: false}, function () {
    users.createIndex({'username': 1}, {unique: true}, function (error) {
      if (error) {
        return callback = error;
      } else {
        callback = null;
      }
    });
  });
  winston.debug('User database created.');
};

/**
 * Creates a category database and defines automatic id generation.
 * Sends out the error message if unsuccessful.
 * @param callback Response.
 */
module.exports.initEventDB = function (callback) {
  events = db.createCollection('event.db', {autoIndexId: true},
      function (error) {
        if (error) {
          return callback = error;
        } else {
          callback = null;
        }
      });
  winston.debug('Event database created.');
};

/**
 * Creates a category database and defines automatic id generation.
 * Sends out the error message if unsuccessful.
 * @param callback Response.
 */
module.exports.initCategoryDB = function (callback) {
  categories = db.createCollection('category.db', {autoIndexId: true},
      function (error) {
        if (error) {
          return callback = error;
        } else {
          callback = null;
        }
      });
  winston.debug('Category database created.');
};

/**
 * Deletes the user database. Sends out the error message if unsuccessful.
 * @param callback Response
 */
module.exports.deleteUserDB = function (callback) {
  users.drop(function (error) {
    if (error) {
      return callback = error;
    } else {
      callback = null;
    }
  });
  winston.debug('User database deleted');
};

/**
 * Deletes the event database. Sends out the error message if unsuccessful
 * @param callback Response
 */
module.exports.deleteEventDB = function (callback) {
  events.drop(function (error) {
    if (error) {
      return callback = error;
    } else {
      callback = null;
    }
  });
  winston.debug('Event database deleted');
};

/**
 * Deletes the category database. Sends out the error message if unsuccessful
 * @param callback Response
 */
module.exports.deleteCategoryDB = function (callback) {
  categories.drop(function (error) {
    if (error) {
      return callback = error;
    } else {
      callback = null;
    }
  });
  winston.debug('Category database deleted');
};
