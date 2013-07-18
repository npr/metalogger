var Log = require('log');

function Logger(level) {
  this._log = new Log(level);
}
exports.Logger = Logger;

Logger.prototype.emit = function(type) {
  console.log('emit');
};

Logger.prototype.log = function(level, message) {
  this._log[level](message);
};