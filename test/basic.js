var assert     = require('assert');

describe('log level check: ', function() {

  var testable = require('../');
  var levels = testable.logLevels();
  var shouldLog = testable.shouldLog;
  var logLevelAllowed = testable.logLevelAllowed;
  var logLevelAllowedGranular = testable.logLevelAllowedGranular;


  it('lesser logger <debug> should not be allowed', function() {
    assert.equal(false, logLevelAllowed('debug', 'warning'));
  });

  it('lesser logger <info> should not be allowed', function() {
    assert.equal(false, logLevelAllowed('info', 'warning'));
  });

  it('lesser logger <notice> should not be allowed', function() {
    assert.equal(false, logLevelAllowed('notice', 'warning'));
  });

  it('equal logger <warning> should be allowed', function() {
    assert.equal(true, logLevelAllowed('warning', 'warning'));
  });

  it('higher logger <error> should be allowed', function() {
    assert.equal(true, logLevelAllowed('error', 'warning'));
  });

  it('higher logger <critical> should be allowed', function() {
    assert.equal(true, logLevelAllowed('critical', 'warning'));
  });

  it('higher logger <alert> should be allowed', function() {
    assert.equal(true, logLevelAllowed('alert', 'warning'));
  });

  it('higher logger <emergency> should be allowed', function() {
    assert.equal(true, logLevelAllowed('emergency', 'warning'));
  });

  it('granular checking should be undefined if not enabled', function() {
    assert.equal(undefined, logLevelAllowedGranular('warning'));
  });

  it('logging is not allowed if we do not know for sure that it is', function () {
    levels.forEach(function(level) {
      assert.equal(false, shouldLog(level));
    });
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