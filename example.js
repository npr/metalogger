var log = require('./lib/metalogger')('npmlog', 'debug');

var util = require('util');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");

log = require('./lib/metalogger')('log', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

// args = ['num: %d, title: %s', 125, "npr"]
// console.log(util.format.apply(null, args));

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");
