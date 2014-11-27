var log;

var exports = module.exports;

exports.foo = function(plugin) {
  log = require('../')(plugin);
  something();
};

function something() {
  log.info("I am in some module");  
  log.debug("This should only show if granular levels are working");
}