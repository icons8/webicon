'use strict';

di('configPerformer', function(injector) {
  var
    strategies = [
      injector('configPerformBaseStrategy')
    ];

  function configPerformer(config) {
    var
      publicApi = injector('publicApi');

    if (typeof config == 'function') {
      config = config(publicApi);
    }
    config = config || {};
    strategies.forEach(function(strategy) {
      strategy(config, injector);
    });
  }

  configPerformer.strategy = function(fn) {
    if (typeof fn == 'function') {
      strategies.push(fn);
    }
  };

  return configPerformer;

});