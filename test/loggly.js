/**
 * This is more of a usage example than an actual unit test
 *
 * Setup your own development.yaml file in the config directory using the default structure
 * adding your own auth_token and messages should be sent to loggly
 *
 * @type {exports}
 */
var CONF = require('config');

/*jshint camelcase: false */
process.env.NODE_LOGGER_LOGGLY_TOKEN = '30e9c505-d9c5-405c-869a-e891fce33583';
process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN = 'irakli';

if (process.env.NODE_LOGGER_LOGGLY_TOKEN && process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN) {
  var log   = require('../')('loggly', 'debug');

  log.debug('test debug level');
  log.info('test info level');
  log.error('test error level');  
}

