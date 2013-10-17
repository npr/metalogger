var callsite = require('callsite')
  , path     = require('path');

// defaults
var _level          = 'info'
  , _loggermodule   = 'util'
  , _granularlevels = true
  , _showlines      = true;


exports = module.exports = function(loggermodule, level) {

  if ('NODE_LOGGER_GRANULARLEVELS' in process.env && process.env.NODE_LOGGER_GRANULARLEVELS == 0) {
    _granularlevels = false;
  }

  if ('NODE_LOGGER_SHOWLINES' in process.env && process.env.NODE_LOGGER_SHOWLINES == 0) {
    _showlines = false;
  }

  if ('NODE_LOGGER_PLUGIN' in process.env && process.env.NODE_LOGGER_PLUGIN) {
    _loggermodule = process.env.NODE_LOGGER_PLUGIN;
  }  
  if (loggermodule) _loggermodule = loggermodule;
  
 
  if ('NODE_LOGGER_LEVEL' in process.env && process.env.NODE_LOGGER_LEVEL) {
    _level = process.env.NODE_LOGGER_LEVEL;
  }  
  if (level) _level = level;

  checkLevelAndPluginValidity(_level, _loggermodule);
  
  var concreteLogger                = require('./bridges/' + _loggermodule)(_level);  
  concreteLogger.loggers            = availableLoggers;
  concreteLogger.levels             = logLevels;
  concreteLogger.thresholdLevel     = _level;
    
  return concreteLogger;
}

exports.logLevelAllowed         = logLevelAllowed;
exports.logLevelAllowedGranular = logLevelAllowedGranular;
exports.callposition            = callposition;

function checkLevelAndPluginValidity(level, logger) {

  var loggers = availableLoggers();
  var foundLogger = false;
  loggers.forEach(function checkLogger(currLogger) {
    if (logger in currLogger) {
      foundLogger = true;
    }    
  });

  var availableLevels = logLevels();
  var foundLevel = false;
  availableLevels.forEach(function checkLevel(currLevel) {
    if (level == currLevel) {
      foundLevel = true;
    }    
  });
  
  if (!foundLevel)  { throw new Error("Level " + level + " is not allowed. Cannot initialize metalogger."); return; }
  if (!foundLogger) { throw new Error("Logger " + logger + " is not implemented. Cannot initialize metalogger."); return; }
  
}

function availableLoggers() {
  return [ { "log"    : "Tiny logger with streaming reader (visionmedia)" }
         , { "npmlog" : "Logger for npm (isaacs)" }  
         , { "util"   : "Native, Node.js' util module-based logging" }
         , { "ain2"   : "Syslog logging for node.js. Continuation of ain" }
  ]
  ;
};

var logLevelsObj = {
    "emergency" : 0
  , "alert"     : 1
  , "critical"  : 2
  , "error"     : 3
  , "warning"   : 4
  , "notice"    : 5
  , "info"      : 6
  , "debug"     : 7
  };

/**
* Syslog levels:
*
* 0 EMERGENCY system is unusable
* 1 ALERT action must be taken immediately
* 2 CRITICAL the system is in critical condition
* 3 ERROR error condition
* 4 WARNING warning condition
* 5 NOTICE a normal but significant condition
* 6 INFO a purely informational message
* 7 DEBUG messages to debug an application
*/
function logLevels() {
  return Object.keys(logLevelsObj);
}
  
function logLevelAllowed(testlevel, thresholdLevel) {
  return logLevelsObj[testlevel] <= logLevelsObj[thresholdLevel];
};

/**
* As opposed to logLevelAllowed() this one doesn't ake testlevel, since that
* needs to be figured-out in-function.
*/
function logLevelAllowedGranular(testlevel) {
  if (!_granularlevels) return false;
  
  var pos = callpositionObj();
  var key = 'NODE_LOGGER_LEVEL_' + pos.filename.replace(/[\.\/]/gi, '_');

  if (key in process.env && process.env[key]) {    
    var thresholdLevel = process.env[key];
    return logLevelsObj[testlevel] <= logLevelsObj[thresholdLevel];
  }  

  return false;
};


function callposition() {
  if (!_showlines) return '';
  
  var stack = callsite();
    
  var position = callpositionObj();     
  var callposition = ' [' + position.filename + ':' + position.lineno + '] ';
  
  return callposition;
}

function callpositionObj() {
  var stack = callsite();
  var call      = stack[4];
  var filename  = call.getFileName();
  var lineno    = call.getLineNumber();
  filename      = filename.replace(process.env.PWD, '');
  filename      = (filename[0] == path.sep) ? filename.substr(1) : filename;

  return {filename: filename, lineno: lineno};
}
