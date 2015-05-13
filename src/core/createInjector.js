'use strict';

function createInjector(fn) {
  var
    providers = {},
    instances = {};

  Object.keys(di.providers).forEach(function(name) {
    providers[name] = di.providers[name];
  });

  function injector(name, provider) {
    var
      error,
      baseProvider;

    if (provider) {
      if (instances.hasOwnProperty(name)) {
        error = new Error('Cannot override instantiated service "' + name + '"');
        console.error(error);
        throw error;
      }
      if (typeof provider != 'function') {
        console.error('Provider "' + name + '" is not a function');
        return;
      }
      if (providers.hasOwnProperty(name)) {
        baseProvider = providers[name];
        providers[name] = function(di) {
          return new provider(di, new baseProvider(di));
        };
      }
      else {
        providers[name] = provider;
      }
    }
    else {
      if (!providers[name]) {
        error = new Error('Cannot found service provider "' + name + '"');
        console.error(error);
        throw error;
      }
      if (!instances.hasOwnProperty(name)) {
        try {
          instances[name] = new providers[name](injector);
        }
        catch(error) {
          console.error(error);
          throw error;
        }
      }
      return instances[name];
    }
  }

  injector.has = function(name) {
    return providers.hasOwnProperty(name);
  };

  injector('ready', function(injector) {
    return function(fn) {
      if (typeof fn == 'function') {
        fn(injector);
      }
      else if (fn) {
        console.error('Ready listener not a function');
      }
    }
  });

  if (fn) {
    if (typeof fn == 'function') {
      fn(injector);
    }
    else {
      console.error('Injector initializer not a function');
    }
  }

  (ready.listeners || []).forEach(function(listener) {
    listener(injector);
  });

  return injector;
}