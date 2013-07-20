var assert     = require('assert');

describe('log level check: ', function() {
  
  var logger = require('../')('npmlog', 'info'); 
  
  it('logger initializes properly', function() {
    assert.equal(true, typeof logger === 'object');
  });

  it('equal logger <info> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('info'));
  });
  
  it('lower logger <debug> not allowed', function() {
    assert.equal(false, logger.logLevelAllowed('debug'));
  });

  it('lower logger <trace> not allowed', function() {
    assert.equal(false, logger.logLevelAllowed('trace'));
  });
  
  it('higher logger <error> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('error'));
  });
  
  it('higher logger <warn> allowed', function() {
    assert.equal(true, logger.logLevelAllowed('warn'));
  });

});
