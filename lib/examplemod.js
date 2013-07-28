var log = require('../')();

var exports = module.exports;

exports.foo = function() {
  something();
}

function something() {
  log.info("I am in some module");
}