'use strict';

function di(name, provider) {
  var
    error,
    baseProvider,
    providers,
    instances;

  providers = di.providers = di.providers || {};
  instances = di.instaces = di.instaces || {};

  if (provider) {
    if (instances.hasOwnProperty(name)) {
      error = new Error('Cannot override instantiated service "' + name + '"');
      console.error(error);
      throw error;
    }
    if (!(provider instanceof Function)) {
      error = new Error('Incorrect provider function "' + name + '"');
      console.error(error);
      throw error;
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
        instances[name] = new providers[name](di);
      }
      catch(error) {
        console.error(error);
        throw error;
      }
    }
    return instances[name];
  }
}

