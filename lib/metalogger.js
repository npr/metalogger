var npmlog = require('npmlog');

var MetaLogger = function(level) {
  npmlog.addLevel('debug', 1001, { fg: 'cyan', bg: 'black' }, 'debg');
  this.level = level || 'debug';
  npmlog.level = this.level;
};

MetaLogger.prototype = {
  log : function(level, message) {
    npmlog.log(level, '[' + new Date + ']', message);
  },
  error : function(message) {
    this.log('error', message);
  },
  warn : function(message) {
    this.log('warn', message);
  },
  info : function(message) {
    this.log('info', message);
  },
  debug : function(message) {
    this.log('debug', message);
  },
  verbose : function(message) {
    this.log('verbose', message);
  }
};

exports = module.exports = function constructor(level) {
  return new MetaLogger(level);
};