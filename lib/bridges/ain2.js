/**
 * ain2 module for writing to syslog
 *
 * 0  emerg    Emergency: system is unusable
 * 1  alert    Alert: action must be taken immediately
 * 2  crit     Critical: critical conditions
 * 3  err      Error: error conditions
 * 4  warn     Warning: warning conditions
 * 5  notice   Notice: normal but significant condition
 * 6  info     Informational: informational messages
 * 7  debug    Debug: debug-level messages
 *
 * @type {SysLogger|exports|*}
 */
var SysLogger   = require('ain2')
  , util        = require('util')
  , log         = {}
  , metalogger  = require('../metalogger');

var _level      = 'debug'
  , _facility   = 'level0'
  , _app_name   = 'app_name';

exports = module.exports = function(level) {

  var levels = ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency']
    , logger = {}
    , options = {
      facility: _facility,
      tag:      _app_name
    };

  if ('NODE_LOGGER_FACILITY' in process.env && process.env.NODE_LOGGER_FACILITY) {
    options.facility = process.env.NODE_LOGGER_FACILITY;
  }

  if ('NODE_LOGGER_APPNAME' in process.env && process.env.NODE_LOGGER_APPNAME) {
    options.tag = process.env.NODE_LOGGER_APPNAME;
  }

  if (levels.indexOf(level) !== -1) _level = level;

  log = new SysLogger(options);

  levels.forEach(function(level) {
    logger[level] = function(){delegate(level, arguments)};
  });


  return logger;
}

function delegate(method, _args) {

  var call_position = metalogger.callposition();

  if (!metalogger.logLevelAllowedGranular(method)) {
    if (!metalogger.logLevelAllowed(method, _level)) {
      return;
    }
  }

  var args = Array.prototype.slice.call(_args);

  var message = [call_position];
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

  log.send(message.join(' '), method);
}