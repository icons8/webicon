'use strict';

di('registerDependencies', function(di) {

  return function registerDependencies($injector) {
    di('log', function() {
      return $injector.get('$log');
    });

    di('httpGet', function() {
      var
        $http = $injector.get('$http'),
        $templateCache = $injector.get('$templateCache')
        ;

      return function(url, params) {
        var
          options = {
            cache: $templateCache
          };
        if (params) {
          options.params = params;
        }
        return $http.get(url, options);
      }
    });

    di('Promise', function() {
      var
        $q = $injector.get('$q');

      function Promise(value) {
        return $q(value);
      }

      Promise.reject = $q.reject;
      Promise.resolve = $q.when;
      Promise.all = $q.all;

      return Promise;
    });

    di('timeout', function() {
      var
        $timeout = $injector.get('$timeout');

      return function(fn, delay) {
        if (typeof fn != 'function') {
          delay = fn;
          fn = function() {};
        }
        return $timeout(fn, delay);
      };
    });

  }

});

