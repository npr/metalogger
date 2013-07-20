var assert     = require('assert');

describe('log level check: ', function() {
  
  var logger = require('../')('util', 'warning'); 
  
  it('logger initializes properly', function() {
    assert.equal(true, typeof logger === 'function');
  });

  it('lesser logger <debug> not allowed', function() {
    assert.equal(false, logger.logLevelAllowed('debug', 'warning'));
  });

  it('lesser logger <info> not allowed', function() {
    assert.equal(false, logger.logLevelAllowed('info', 'warning'));
  });

  it('lesser logger <notice> not allowed', function() {
    assert.equal(false, logger.logLevelAllowed('notice', 'warning'));
  });

  it('equal logger <warning> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('warning', 'warning'));
  });

  it('higher logger <error> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('error', 'warning'));
  });

  it('higher logger <critical> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('critical', 'warning'));
  });

  it('higher logger <alert> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('alert', 'warning'));
  });

  it('higher logger <emergency> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('emergency', 'warning'));
  });


});