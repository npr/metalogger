process.env.NODE_LOGGER_SHOWLINES = 1;
process.env.NODE_LOGGER_LEVEL = 'info';

// Granularity checks


var samplemod = require('./lib/examplemod.js');

console.log("Testing granularity for util");
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = null;
samplemod.foo('util');
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = 'debug';
samplemod.foo('util');

console.log("Testing granularity for npmlog");
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = null;
samplemod.foo('npmlog');
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = 'debug';
samplemod.foo('npmlog');

console.log("Testing granularity for log.js");
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = null;
samplemod.foo('log');
process.env.NODE_LOGGER_LEVEL_lib_examplemod_js = 'debug';
samplemod.foo('log');


//-- Test data

var obj = {
  "name"         : "Irakli"
, "lastname"     : "Nadareishvili"
, "organization" : "NPR" 
, "languages"    : ["Node.js", "Java", "Golang", "Python", "Ruby", "TCL"]
, "tvshows"      : ["Burn Notice", "Top Gear", "Scrubs"]
}

//------ Winston
console.log('------ USING Winston.js');

log = require('./lib/metalogger')('winston', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);
log.info('some caption', obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

//------ Npmlog.js
console.log('------ USING NPMLOG');

var log = require('./lib/metalogger')('npmlog', 'debug');
var util = require('util');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);
log.info('some caption', obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

//------ Log.js
console.log('------ USING LOG.js');

log = require('./lib/metalogger')('log', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);
log.info('some caption', obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

//------ UTIL
console.log('------ USING Util');

log = require('./lib/metalogger')('util', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);
log.info('some caption', obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

//------ UTIL Limitation

log = require('./lib/metalogger')('util', 'alert');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical'); 

// -- TEST DEFAULTS

log = require('./lib/metalogger')(); //use sefaults or process.env values

log.info("THIS IS TESTING DEFAULTS");
log.warning("WARNING: env process vars are being used!");