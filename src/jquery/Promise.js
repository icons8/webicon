'use strict';

service('Promise', function() {

  if (window.Promise) {
    return window.Promise;
  }

  function Promise(param) {
    var
      deferred;

    if (typeof param == 'function') {
      deferred = new jQuery.Deferred();
      param(deferred.resolve, deferred.reject);
      this._jqPromise = deferred;
    }
    else if (param && typeof param == 'object' && param.then){
      this._jqPromise = param._jqPromise
        ? param._jqPromise
        : param;
    }
    else {
      this._jqPromise = new jQuery.Deferred().resolve(param);
    }
  }

  Promise.reject = function(value) {
    return new Promise(
      new jQuery.Deferred().reject(value)
    );
  };

  Promise.resolve = function(value) {
    return new Promise(
      new jQuery.Deferred().resolve(value)
    );
  };

  Promise.prototype = {

    then: function(done, fail) {
      var
        jqPromise;

      jqPromise = this._jqPromise.then(
        done && function(value) {
          var
            result = done(value);
          if (result && typeof result == 'object' && result._jqPromise) {
            result = result._jqPromise;
          }
          return result;
        },
        fail && function(value) {
          var
            result = fail(value);
          if (result && typeof result == 'object' && result.then) {
            return result._jqPromise
              ? result._jqPromise
              : result;
          }
          if (typeof result != 'undefined') {
            return new jQuery.Deferred().reject(result);
          }
        }
      );

      return new Promise(jqPromise);
    }

  };

  return Promise;

});
