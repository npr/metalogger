var log = require('./lib/metalogger')('npmlog', 'trace');

//console.dir(log);

log.info('something info');
log.error('something error');
log.debug('something debug');
log.trace('something trace');
log.warn('kkk');