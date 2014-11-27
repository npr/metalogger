var assert     = require('assert');

describe('AIN2 Checks: ', function() {

  var logLevelAllowed = require('../').logLevelAllowed; 

  it('AIN2 should be an optional dependency', function() {

    // If ain2 is installed no error will be thrown, if not: a very specific error should be thrown    
    try {
      var log   = require('../')('ain2', 'debug');
    } catch(err) {
      var expectedErrMsg = 'Error: Unrecoverable error: in order to use syslog/ain2 bridge, you need to: npm install ain2. Aborting.';
      assert.equal(expectedErrMsg, err.toString());
    }
    
    
  });
  
});