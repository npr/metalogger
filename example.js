var log = require('./lib/metalogger')('npmlog', 'debug');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');

// Complex syntax:
log.error('caption', 'num: %d, title: %s', 125, "npr");


log = require('./lib/metalogger')('log', 'info');

log.info('something info');
log.error('something error');
log.debug('something debug');
log.notice('something notice');
log.warning('something warning');
log.alert('something alert');
log.critical('something critical');
