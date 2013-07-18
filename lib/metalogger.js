var util = require('util');

var logging = require('./log');

var MetaLogger = function(level) {
  logging.Logger.call(this, level);
};

util.inherits(MetaLogger, logging.Logger);

MetaLogger.prototype.error = function(message) {
  this.log('error', message);
};

MetaLogger.prototype.info = function(message) {
  this.log('info', message);
};

MetaLogger.prototype.debug = function(message) {
  this.log('debug', message);
};

MetaLogger.prototype.warn = function(message) {
  this.log('warning', message);
};

exports = module.exports = function(level) {
  return new MetaLogger(level);
};