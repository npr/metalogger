/**
 * Loggly implementation for metalogger
 *
 * @type {Loggly|exports|*}
 */
var loggly      = require('loggly')
  , util        = require('util')
  , os          = require('os')
  , client      = {}
  , authToken  = null
  , metalogger  = require('../metalogger');

/**
 * Default log level if non provided
 * @type {string}
 * @private
 */
var _level      = 'debug';

var levels = {'debug':7, 'info':6, 'notice':5, 'warning':4, 'error':3, 'critical':2, 'alert':1, 'emergency':0};

exports = module.exports = function(level) {


  var logger = {}
    , options = {
      subdomain: 'test'
    };

  if ('NODE_LOGGER_LOGGLY_SUBDOMAIN' in process.env && process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN) {
    options.subdomain = process.env.NODE_LOGGER_LOGGLY_SUBDOMAIN;
  }

  if ('NODE_LOGGER_LOGGLY_TOKEN' in process.env && process.env.NODE_LOGGER_LOGGLY_TOKEN) {
    authToken = process.env.NODE_LOGGER_LOGGLY_TOKEN;
  }

  var config = {
    subdomain: options.subdomain,
    auth: null,
    json: true
  };

  if (level in levels) { _level = level; }

  client = loggly.createClient(config);
  // Fix based on comment from github: https://github.com/nodejitsu/node-loggly/pull/28#issuecomment-26730172
  Object.defineProperty(client.config, 'inputUrl', {
    value: 'https://logs-01.loggly.com/inputs/',
    enumerable: true,
    configurable: true
  });

  for(var iLevel in levels) {
  if (levels.hasOwnProperty(iLevel)) {  
    logger[iLevel] = (function(iLevel, args){
      return function(){
        delegate(iLevel, args);
      };
    })(iLevel, arguments);
  }  
  }

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

  if (!metalogger.logLevelAllowedGranular(method)) {
    if (!metalogger.logLevelAllowed(method, _level)) {
      return;
    }
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

  if(authToken) {
    client.log(authToken, jsonFormat, function(err){
      if(err) {
        console.log('error occured while logging to loggly', err);
      }
    });
  } else {
    console.error('Loggly auth token not provided');
  }
}