var log = require('./lib/metalogger')('npmlog', 'debug');
var util = require('util');

var obj = {
  "name"         : "Irakli"
, "lastname"     : "Nadareishvili"
, "organization" : "NPR" 
, "languages"    : ["Node.js", "Java", "PHP", "Python", "Ruby", "TCL"]
, "tvshows"      : ["Burn Notice", "Top Gear", "Scrubs"]
}
//------ Npmlog.js

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");


//------ Log.js

log = require('./lib/metalogger')('log', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

//------ UTIL

log = require('./lib/metalogger')('util', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

log.info(obj);

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");
