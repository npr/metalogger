var util        = require('util')
  , os          = require('os')
  , client      = {}
  , S3StreamLogger = require('s3-streamlogger').S3StreamLogger
  , metalogger  = require('../metalogger');
  
var bucketDetails = {
  bucket: '',
  access_key_id: '',
  secret_access_key: '',
  server_side_encryption: false,
  name_format: '%Y-%m-%d-%H-%M-%S-%L-' + (process.env.NODE_ENV || 'development') + '-' + os.hostname() + '.log'
};

var _level = 'debug';

exports = module.exports = function(level) {
  var levels = {'debug':7, 'info':6, 'notice':5, 'warning':4, 'error':3, 'critical':2, 'alert':1, 'emergency':0};

  if ('NODE_LOGGER_S3_BUCKET' in process.env && process.env.NODE_LOGGER_S3_BUCKET) {
    bucketDetails.bucket = process.env.NODE_LOGGER_S3_BUCKET.replace(/\/$/, '');
  }

  if ('NODE_LOGGER_S3_KEY_ID' in process.env && process.env.NODE_LOGGER_S3_KEY_ID) {
    bucketDetails.access_key_id = process.env.NODE_LOGGER_S3_KEY_ID;
  }

  if ('NODE_LOGGER_S3_KEY_SECRET' in process.env && process.env.NODE_LOGGER_S3_KEY_SECRET) {
    bucketDetails.secret_access_key = process.env.NODE_LOGGER_S3_KEY_SECRET;
  }

  if ('NODE_LOGGER_S3_USE_SSE' in process.env && process.env.NODE_LOGGER_S3_USE_SSE) {
    bucketDetails.server_side_encryption = true;
  }

  if (level in levels) { _level = level; }

  client = new S3StreamLogger(bucketDetails);

  var logger = {};
  
  logger.debug      = function() { delegate('debug', arguments); };
  logger.info       = function() { delegate('info', arguments); };
  logger.notice     = function() { delegate('notice', arguments); };
  logger.warning    = function() { delegate('warning', arguments); };
  logger.error      = function() { delegate('error', arguments); };
  logger.critical   = function() { delegate('critical', arguments); };
  logger.alert      = function() { delegate('alert', arguments); };
  logger.emergency  = function() { delegate('emergency', arguments); };
  
  return logger;
};

/**
 * Delegate function for each log level
 *
 * @param method
 * @param _args
 */
function delegate(method, _args) {

  var callPosition = metalogger.callposition()
    , file
    , line;

  if (!metalogger.shouldLog(method, _level)) {
    return;
  }


  var args = Array.prototype.slice.call(_args);

  var message = ''
    , inspect = null;
  
  message = util.inspect(args.shift(), { showHidden: true, depth: null }).replace(/\n/g, ' ');

  inspect = args[0];
  
  if (args.length > 2) {
    inspect = util.format.apply(null, args);
  }

  try{
    file = callPosition.split(':')[0].replace(' [','');
    line = callPosition.split(':')[1].replace('] ','');
  } catch(e) {
    // something went wrong with stack trace
  }

  var jsonFormat = {
    timestamp: (new Date()).toISOString(),
    hostname: os.hostname(),
    level: method,
    file: file,
    line: line,
    debug: inspect
  };
  
  if(bucketDetails.bucket.length !== 0 && bucketDetails.access_key_id.length !== 0 && bucketDetails.secret_access_key.length !== 0) {
    client.write(util.format("%s %s [host=%s] [message=%s] [message.stream] %s\n", jsonFormat.timestamp, method.toUpperCase(), jsonFormat.hostname, message, JSON.stringify(jsonFormat)));
  } else {
    console.error('Sumologic is not configured correctly, please provide `NODE_LOGGER_S3_BUCKET`, `NODE_LOGGER_S3_KEY_ID`, and `NODE_LOGGER_S3_KEY_SECRET` environment variables.');
  }
}
