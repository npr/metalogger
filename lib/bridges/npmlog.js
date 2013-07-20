var npmlog  = require('npmlog');
  
var _level = 'info';
  
exports = module.exports = function(level) {
  if (level) _level = level;
  
  npmlog.level = _level;
  
  npmlog.addLevel('trace', 0);
  npmlog.addLevel('debug', 1);
  npmlog.addLevel('info',  2);
  npmlog.addLevel('warn',  3);
  npmlog.addLevel('error', 4);
  
  return logwrapper;
}

var logwrapper =  function() {}

logwrapper.info = function() {
  npmlog.info('', message);
}

logwrapper.error = function(message) {
  npmlog.error('', message);
}

logwrapper.warn = function(message) {
  npmlog.log('warn', '', message);
}

logwrapper.debug = function(message) {
  npmlog.log('debug', '', message);
}

logwrapper.trace = function(message) {
  npmlog.log('trace', '', message);
}

function delegate() {
  
  var method = arguments.unshift(method);
  //npmlog.log.apply();
}