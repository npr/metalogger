var util = require('util');

var Log = require('log')
  , log = {};
  
var _level     = 'debug';
  
exports = module.exports = function(level) {

  if (level) _level = level;
  log = new Log(_level);
 
  var logwrapper =  function() {}
    
  logwrapper.debug      = function() { delegate('debug', arguments); }
  logwrapper.info       = function() { delegate('info', arguments); }
  logwrapper.notice     = function() { delegate('notice', arguments); }
  logwrapper.warning    = function() { delegate('warning', arguments); }
  logwrapper.error      = function() { delegate('error', arguments); }
  logwrapper.critical   = function() { delegate('critical', arguments); }
  logwrapper.alert      = function() { delegate('alert', arguments); }
  logwrapper.emergency  = function() { delegate('emergency', arguments); }
  
  return logwrapper;
}

function delegate(method, _args) {

  var args = Array.prototype.slice.call(_args);

  if (args.length === 1) {
    log[method](args[0]);
  }
  
  if (args.length > 1) {
    var caption = args.shift();
    log[method](caption + " " + util.format.apply(null, args));
  }
  
}