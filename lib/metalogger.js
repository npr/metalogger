var util = require('util');

var logging = require('./log');

var MetaLogger = function(level) {
  logging.Logger.call(this, level);
};

util.inherits(MetaLogger, logging.Logger);

MetaLogger.prototype.error = function(message) {
  this.log('error', arguments);
};

MetaLogger.prototype.info = function(message) {
  this.log('info', arguments);
};

MetaLogger.prototype.debug = function(message) {
  this.log('debug', arguments);
};

MetaLogger.prototype.warn = function(message) {
  this.log('warning', arguments);
};

exports = module.exports = function(level) {
  return new MetaLogger(level);
};