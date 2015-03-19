

var
  log = getConsoleWriteDelegateDebug();

log.debug = log;

['log', 'info', 'warn', 'error'].forEach(function(type) {
  log[type] = getConsoleWriteDelegate(type);
});

function getConsoleWriteDelegate(type) {
  return function() {
    var
      log = window.console;

    if (log) {
      log[type].apply(log, Array.prototype.slice.call(arguments));
    }
  }
}

function getConsoleWriteDelegateDebug() {
  var
    noop = function() {};

  if (!config.debugEnabled) {
    return noop;
  }

  return getConsoleWriteDelegate('debug');
}