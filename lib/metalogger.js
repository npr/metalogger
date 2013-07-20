module.exports = function(loggermodule, level) {

  var concreteLogger                = require('./bridges/' + loggermodule)(level);  
  concreteLogger.loggers            = availableLoggers;
  concreteLogger.levels             = logLevels;
  concreteLogger.logLevelAllowed    = logLevelAllowed;
  
  concreteLogger.thresholdLevel = 'info'; //default
  if (level) concreteLogger.thresholdLevel = level;
  
  var levels = logLevels();

  //for (i = 0; i<levels.length; i++) {
  //  concreteLogger[levels[i]] = delegate(levels[i], concreteLogger);
  //}
  
  return concreteLogger;
}

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

function logLevels() {
  return ["error", "warn", "info", "debug", "trace"];
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
