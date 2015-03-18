
function registerProviders($injector) {

  providers.logProvider = function() {
    return $injector.get('$log');
  };

  providers.httpGetProvider = function() {
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
  };

  providers.PromiseProvider = function() {
    return $injector.get('$q');
  };

  providers.timeoutProvider = function() {
    var
      $timeout = $injector.get('$timeout');

    return function(fn, delay) {
      if (typeof fn != 'function') {
        delay = fn;
        fn = function() {};
      }
      return $timeout(fn, delay);
    };
  };

}
