/**
 * Loggly implementation for metalogger
 *
 * @type {Loggly|exports|*}
 */
var optional   = require('optional')
  , loggly   = optional('loggly')
  , util        = require('util')
  , os          = require('os')
  , client      = {}
  , options = {
      subdomain: 'test',
      auth: null,
      json: true
    }
  , metalogger  = require('../metalogger');

/**
 * Default log level if non provided
 * @type {string}
 * @private
 */
var _level      = 'debug';

var levels = {'debug':7, 'info':6, 'notice':5, 'warning':4, 'error':3, 'critical':2, 'alert':1, 'emergency':0};

exports = module.exports = function(level) {


  var logger = {};

  if ('NODE_LOGGER_LOGGLY_SUBDOMAIN' in process.env && process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN) {
    options.subdomain = process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN;
  }

  if ('NODE_LOGGER_LOGGLY_TOKEN' in process.env && process.env.NODE_LOGGER_LOGGLY_TOKEN) {
    options.token = process.env.NODE_LOGGER_LOGGLY_TOKEN;
  }

  if (level in levels) { _level = level; }

  client = loggly.createClient(options);

  logger.debug      = function() { delegate('debug', arguments); };
  logger.info       = function() { delegate('info', arguments); };
  logger.notice     = function() { delegate('notice', arguments); };
  logger.warning    = function() { delegate('warning', arguments); };
  logger.error      = function() { delegate('error', arguments); };
  logger.critical   = function() { delegate('critical', arguments); };
  logger.alert      = function() { delegate('alert', arguments); };
  logger.emergency  = function() { delegate('emergency', arguments); };

  return logger;
};

/**
 * Delegate function for each log level
 *
 * @param method
 * @param _args
 */
function delegate(method, _args) {

  var callPosition = metalogger.callposition()
    , file
    , line;

  if (!metalogger.shouldLog(method, _level)) {
    return;
  }

  var args = Array.prototype.slice.call(_args);

  var message = [];
  if(args.length === 1) {
    message.push(util.inspect(args[0], { showHidden: true, depth: null }));
  }

  if(args.length === 2) {
    message.push(args.shift());
    message.push(util.inspect(args[0], { showHidden: true, depth: null }));
  }

  if(args.length > 2) {
    message.push(args.shift());
    message.push(util.format.apply(null, args));
  }

  try{
    file = callPosition.split(':')[0].replace(' [','');
    line = callPosition.split(':')[1].replace('] ','');
  } catch(e) {
    // something went wrong with stack trace
  }


  var jsonFormat = {
    timestamp: (new Date()).toISOString(),
    hostname: os.hostname(),
    level: method,
    file: file,
    line: line,
    message: message.join(' ')
  };

  if(options.token) {
    client.log(jsonFormat, function(err){
      if(err) {
        console.error('error occured while logging to loggly', err);
      }
    });
  } else {
    console.error('Loggly auth token not provided');
  }
}
