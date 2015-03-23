'use strict';

service('registerProviders', function(service) {
  return function registerProviders($injector) {

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
      return $injector.get('$q');
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

