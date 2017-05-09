var winston  = require('winston');
var util     = require('util');

var _level     = 'debug';
var logger;
  
exports = module.exports = function(level, loggerInstance) {

  if (typeof(loggerInstance) === 'undefined') {
    logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: (process.env.NODE_LOGGER_LEVEL || 'debug'),
          handleExceptions: true,
          json: false, colorize: true
        })
      ],
      exitOnError: false
    });
  } else {
    logger = loggerInstance;
  }

  if (level) { _level = level; }
 
  var logwrapper =  function() {};
    
  logwrapper.debug      = function() { delegate('debug', arguments); };
  logwrapper.info       = function() { delegate('info', arguments); };
  logwrapper.notice     = function() { delegate('notice', arguments); };
  logwrapper.warning    = function() { delegate('warning', arguments); };
  logwrapper.error      = function() { delegate('error', arguments); };
  logwrapper.critical   = function() { delegate('critical', arguments); };
  logwrapper.alert      = function() { delegate('alert', arguments); };
  logwrapper.emergency  = function() { delegate('emergency', arguments); };
    
  return logwrapper;
};

function delegate(method, _args) {

  var shouldLog    = require('../metalogger').shouldLog
    , callposition = require('../metalogger').callposition();

  if (!shouldLog(method, _level)) {
    return;
  }

  var args = Array.prototype.slice.call(_args);
  var msg, caption, out;
  
  if (args.length === 1) {
    msg = args[0];
    if (typeof msg !== 'string') {
      msg = util.inspect(args[0], { showHidden: true, depth: null });
    }
    out = callposition + msg;
  }

  if (args.length === 2) {
    caption = args.shift();
    msg = args[0];
    if (typeof msg !== 'string') {
      msg = util.inspect(args[0], { showHidden: true, depth: null });
    }
    out = callposition +  caption + " " + msg;
  }
  
  if (args.length > 2) {
    caption = args.shift();
    out = callposition + caption + " " + util.format.apply(null, args);
  }
  
  out = currDate() + out;

  var logMethod = meta2winstonMethod(method);
  logger[logMethod](out);
}

function meta2winstonMethod(metaMethod) {

  var logLevelsObj = {
      "emergency" : 'error'
    , "alert"     : 'error'
    , "critical"  : 'error'
    , "error"     : 'error'
    , "warning"   : 'warn'
    , "notice"    : 'verbose'
    , "info"      : 'info'
    , "debug"     : 'debug'
  };

  var out = logLevelsObj[metaMethod] || 'debug';
  return out;
}

function currDate() {
  var now = new Date();
  return " - " + now.toUTCString() + " - "; // 
}