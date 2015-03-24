'use strict';

di('log', function() {
  var
    noop = function() {},
    log = {},
    logDebug = getConsoleWriteDelegate('debug');

  ['log', 'info', 'warn', 'error'].forEach(function(type) {
    log[type] = getConsoleWriteDelegate(type);
  });

  log.debug = function() {
    if (!log.debugEnabled) {
      return noop;
    }
    return logDebug.apply(null, Array.prototype.slice.call(arguments));
  };

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

