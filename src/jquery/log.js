'use strict';

di('log', function(injector) {
  var
    log = {};

  ['log', 'info', 'warn', 'error'].forEach(function(type) {
    log[type] = getConsoleWriteDelegate(type);
  });

  return log;

  function getConsoleWriteDelegate(type) {
    return function() {
      var
        console = window.console,
        args = Array.prototype.slice.call(arguments);

      if (console[type].apply) {
        console[type].apply(console, args);
      }
      else {
        switch(args.length) {
          case 0: console[type](); break;
          default:
            args.forEach(function(arg) {
              console[type](arg);
            });
        }
      }
    }
  }



});

