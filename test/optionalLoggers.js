var assert     = require('assert');
var installErr = 'Error: Installation required:';
var logger;

describe('Optional Logger Checks: ', function() {

  // If each is installed no error will be thrown, if not: a very specific error should be thrown

  it('ain2 should be an optional dependency', function() {
    try {
      logger   = require('../')('ain2', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

  it('log should be an optional dependency', function () {

    try {
      logger = require('../')('log', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

  it('loggly should be an optional dependency', function () {

    try {
      logger = require('../')('loggly', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

  it('npmlog should be an optional dependency', function () {

    try {
      logger = require('../')('npmlog', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

  it('sumologic should be an optional dependency', function () {

    try {
      logger = require('../')('sumologic', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

  it('winston should be an optional dependency', function () {

    try {
      logger = require('../')('winston', 'debug');
    } catch (err) {
      assert.ok(err.toString().indexOf(installErr) === 0);
    }
  });

});
