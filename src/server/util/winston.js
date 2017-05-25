/**
 * Created by Til on 13.05.2017.
 */

const winston = require('winston');

// configure winston logger to use winston with one line in application
winston.remove(winston.transports.Console);
// add console logger output for immediate feedback
winston.add(winston.transports.Console,
    {
      level: 'debug',
      timestamp: timestamp(),
      formatter: function (options) {
        return options.level.toUpperCase() + '\t'
            + timestamp() + ' '
            + (options.message ? options.message : '');
      },
    });

// add file output, offers more verbose output than the console version
winston.add(winston.transports.File,
    {
      filename: 'logfile.log',
      level: 'silly',
      json: false,
      timestamp: timestamp(),
      formatter: function (options) {
        return options.level.toUpperCase() + '\t'
            + timestamp() + ' '
            + (options.message ? options.message : '');
      },
    });

/**
 * Helper function to get a nicely formatted date for logging
 * @returns {string} formatted date string
 */
function timestamp() {
  let date = new Date();

  return date.getFullYear() + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + date.getDate()).slice(-2) + ' '
      + ('0' + date.getHours()).slice(-2) + ':'
      + ('0' + date.getMinutes()).slice(-2) + ':'
      + ('0' + date.getSeconds()).slice(-2);
}

module.exports = winston;
