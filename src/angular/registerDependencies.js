'use strict';

service('registerDependencies', function(service) {

  return function registerDependencies($injector) {
    service('log', function() {
      return $injector.get('$log');
    });

    service('httpGet', function() {
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

    service('Promise', function() {
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

    service('timeout', function() {
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

