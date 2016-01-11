"use strict";

var _             = require('lodash');
var assert        = require('assert');
var childProcess  = require('child_process');
var Promise       = require('promise');
var debug         = require('debug')('taskcluster-lib-testing');
var events        = require('events');
var util          = require('util');
var base          = require('taskcluster-base');
var fs            = require('fs');
var path          = require('path');
var uuid          = require('uuid');
var taskcluster   = require('taskcluster-client');
var azureTable    = require('azure-table-node');

exports.PulseTestReceiver    = require('./pulse');
exports.schemas              = require('./schemas');
exports.createMockAuthServer = require('./mockauth');

/** Return promise that is resolved in `delay` ms */
var sleep = function(delay) {
  return new Promise(function(accept) {
    setTimeout(accept, delay);
  });
};

// Export sleep
exports.sleep = sleep;

/**
 * Poll a function that returns a promise until the promise is resolved without
 * errors. Poll `iterations` number of times, with `delay` ms in between.
 *
 * Defaults to 16 iterations with a delay of 250 ms.
 *
 * Return a promise that a promise form the `poll` function resolved without
 * error. This will return the first successful poll, and stop polling.
 */
var poll = function(doPoll, iterations, delay) {
  return doPoll().catch(function(err) {
    // Re-throw
    if (iterations != undefined && iterations <= 0) {
      throw err;
    }
    return sleep(delay).then(function() {
      return poll(doPoll, (iterations || 20) - 1, delay || 250);
    });
  });
};

// Export poll
exports.poll = poll;