exports = module.exports = function(loggermodule, level) {

  if ('NODE_LOGGER_PLUGIN' in process.env && process.env.NODE_LOGGER_PLUGIN) {
    loggermodule = process.env.NODE_LOGGER_PLUGIN;
  }  
  if (!loggermodule) loggermodule = 'util'; // default to util.
  
  var _level = 'info'; //default
  if ('NODE_LOGGER_LEVEL' in process.env && process.env.NODE_LOGGER_LEVEL) {
    _level = process.env.NODE_LOGGER_LEVEL;
  }  
  if (level) _level = level;

  var concreteLogger                = require('./bridges/' + loggermodule)(_level);  
  concreteLogger.loggers            = availableLoggers;
  concreteLogger.levels             = logLevels;
  //concreteLogger.logLevelAllowed    = logLevelAllowed;
  concreteLogger.thresholdLevel     = _level;
    
  return concreteLogger;
}

exports.logLevelAllowed = logLevelAllowed;

//function delegate(level) {
//  
//  return function(message) {
//    console.log(message);
//  };  
//}



function availableLoggers() {
  return [ { "log"    : "Tiny logger with streaming reader (visionmedia)" }
         , { "npmlog" : "Logger for npm (isaacs)" }  
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
  for (i = 0; i<levels.length; i++) {
    // Check testlevel first, so equl = allowed
    if (levels[i] == testlevel) return true;
    if (levels[i] == thresholdLevel) return false;  
  }
  return false;
};
