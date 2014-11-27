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
process.env.NODE_LOGGER_LOGGLY_TOKEN = CONF.test.auth_token;
process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN = 'pmp';

if (process.env.NODE_LOGGER_LOGGLY_TOKEN && process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN) {
  var log   = require('../')('loggly', 'debug');

  log.debug('test debug level');
  log.info('test info level');
  log.error('test error level');  
}

