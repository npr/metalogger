var assert     = require('assert');

describe('log level check: ', function() {
  
  var logLevelAllowed = require('../').logLevelAllowed; 
  
  it('lesser logger <debug> not allowed', function() {
    assert.equal(false, logLevelAllowed('debug', 'warning'));
  });

  it('lesser logger <info> not allowed', function() {
    assert.equal(false, logLevelAllowed('info', 'warning'));
  });

  it('lesser logger <notice> not allowed', function() {
    assert.equal(false, logLevelAllowed('notice', 'warning'));
  });

  it('equal logger <warning> allowed', function() {
    assert.equal(true, logLevelAllowed('warning', 'warning'));
  });

  it('higher logger <error> allowed', function() {
    assert.equal(true, logLevelAllowed('error', 'warning'));
  });

  it('higher logger <critical> allowed', function() {
    assert.equal(true, logLevelAllowed('critical', 'warning'));
  });

  it('higher logger <alert> allowed', function() {
    assert.equal(true, logLevelAllowed('alert', 'warning'));
  });

  it('higher logger <emergency> allowed', function() {
    assert.equal(true, logLevelAllowed('emergency', 'warning'));
  });


});

describe('initialization verification: ', function() {
    
  it('logger initializes properly with valid level and logger plugin', function() {
    var logger = require('../')('util', 'info');  
    assert.equal(true, typeof logger === 'function');
  });

  it('logger bans invalid logger plugin', function() {
    assert.throws(
      function() {
        var logger = require('../')('utility', 'info');
      },
      /Logger (.*?) is not implemented. Cannot initialize metalogger./
    );
  });

  it('logger bans invalid logger level', function() {
    assert.throws(
      function() {
        var logger = require('../')('util', 'information');
      },
      /Level (.*?) is not allowed. Cannot initialize metalogger./
    );
  });


});