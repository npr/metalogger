
// defaults
var _level = 'info'
  , _loggermodule = 'util'
  , _showlines = true;


exports = module.exports = function(loggermodule, level) {

 if ('NODE_LOGGER_SHOWLINES' in process.env && process.env.NODE_LOGGER_SHOWLINES == 1) {
    _showlines = true;
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

exports.logLevelAllowed = logLevelAllowed;
exports.callposition    = callposition;

//function delegate(level) {
//  
//  return function(message) {
//    console.log(message);
//  };  
//}

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
  ]
  ;
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
  return ["emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"];
}


function logLevelAllowed(testlevel, thresholdLevel) {
  var levels = logLevels();
  
  // Logic: iterating over loglevels, if we hit threshold_level before testlevel = not allowed.  
  for (var idx in levels) {
    level = levels[idx];
    if (level == testlevel)       {return true};
    if (level == thresholdLevel)  {return false};      
  };
  
  return false;
};

function callposition() {
  if (!_showlines) return '';
  
  var stack = require('callsite')();
  var path = require('path');
    
  var call = stack[3];
  var filename = path.normalize(call.getFileName());
  var lineno = call.getLineNumber();
  var PWD   = path.normalize(process.env.PWD);
  filename = filename.replace(PWD, '');
  filename = (filename[0] == path.sep) ? filename.substr(1) : filename;
     
  var callposition = ' [' + filename + ':' + lineno + '] ';
  
  return callposition;
}
