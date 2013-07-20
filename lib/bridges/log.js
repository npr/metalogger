var Log  = require('log');

var Log = require('log');
  
var _level = 'info'
  , log    = {};
  
exports = module.exports = function(level) {
  if (level) _level = level;
  _level = 
    
  log = new Log(_level);
  
  return logwrapper;
}

var logwrapper =  function() {}

logwrapper.info = function() {
  delegate('info', arguments);
}

logwrapper.error = function(message) {
  delegate('error', arguments);
}

logwrapper.warn = function(message) {
  delegate('warn', arguments);
}

logwrapper.debug = function(message) {
  delegate('debug', arguments);
}

logwrapper.trace = function(message) {
  delegate('trace', arguments);
}

function delegate(method, _args) {

  var args = Array.prototype.slice.call(_args);

  //log[mapping[method]](args[0]);

/**
  console.dir(args);
  
  if (args.length === 1) {
    npmlog.log(method, '', args[0]);
  }
  
  if (args.length > 1) {
    args.unshift(method);
    npmlog.log.apply(null, args);
  }
**/  
}