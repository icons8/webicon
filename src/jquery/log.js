'use strict';

service('log', function() {
  var
    noop = function() {};

  function log() {
    if (!log.debugEnabled) {
      return noop;
    }
    return log.debug.apply(log, Array.prototype.slice.call(arguments));
  }

  ['log', 'info', 'warn', 'error', 'debug'].forEach(function(type) {
    log[type] = getConsoleWriteDelegate(type);
  });

  return log;

  function getConsoleWriteDelegate(type) {
    return function() {
      var
        console = window.console;

      if (console) {
        console[type].apply(console, Array.prototype.slice.call(arguments));
      }
    }
  }



});

