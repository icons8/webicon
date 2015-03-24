'use strict';

di('timeout', function(di) {

  function timeout(fn, delay) {
    var
      Promise = di('Promise'),
      promise,
      resolve;

    if (typeof fn != 'function') {
      delay = fn;
      fn = function() {};
    }

    promise = new Promise(function(resolveFn) {
      resolve = resolveFn;
    });
    promise.then(fn);
    promise._timeoutId = setTimeout(resolve, delay);

    return promise;
  }

  timeout.cancel = function(timeoutPromise) {
    if (timeoutPromise._timeoutId) {
      clearTimeout(timeoutPromise._timeoutId);
    }
  };

  return timeout;

});

