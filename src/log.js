

var
  log = getConsoleWriteDelegateDebug();

log.debug = log;

['log', 'info', 'warn', 'error'].forEach(function(type) {
  log[type] = getConsoleWriteDelegate(type);
});

function getConsoleWriteDelegate(type) {
  return function() {
    var
      logProvider = providers.logProvider || window.console;

    if (logProvider) {
      logProvider[type].apply(logProvider, Array.prototype.slice.call(arguments));
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