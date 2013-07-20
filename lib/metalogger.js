var util = require('util');

var logging = require('./log');

var MetaLogger = function(level) {
  logging.Logger.call(this, level);
};

util.inherits(MetaLogger, logging.Logger);

MetaLogger.prototype.error = function(message) {
  this.log('error', arguments);
};

MetaLogger.prototype.info = function(message) {
  this.log('info', arguments);
};

MetaLogger.prototype.debug = function(message) {
  this.log('debug', arguments);
};

MetaLogger.prototype.warn = function(message) {
  this.log('warning', arguments);
};

var thresholdLevel = 'info';

module.exports = function(loggermodule, level) {

  if (level) thresholdLevel = level;
  
  var concreteLogger                = require('./bridges/' + loggermodule)(level);  
  concreteLogger.loggers            = availableLoggers;
  concreteLogger.levels             = logLevels;
  concreteLogger.logLevelAllowed    = logLevelAllowed;
  
  return concreteLogger;
}

function availableLoggers() {
  return [ { "log"    : "Tiny logger with streaming reader (visionmedia)" }
         , { "npmlog" : "Logger for npm (isaacs)" }  
  ]
  ;
};

function logLevels() {
  return ["error", "warn", "info", "debug", "trace"];
}


function logLevelAllowed(testlevel) {
  var levels = logLevels();

  // Logic: iterating over loglevels, if we hit threshold_level before testlevel = not allowed.  
  for (i = 0; i<levels.length; i++) {
    // Check testlevel first, so equl = allowed
    if (levels[i] == testlevel) return true;
    if (levels[i] == thresholdLevel) return false;  
  }
  return false;
};
