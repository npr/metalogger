var util = require("util");

var log = require('./lib/metalogger')('info');


log.error('message');
log.debug('message');
log.info('message');
log.warn('message');