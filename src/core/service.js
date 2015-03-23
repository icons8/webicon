'use strict';

function service(name, provider) {
  var
    providers,
    instances;

  providers = service.providers = service.providers || {};
  instances = service.instaces = service.instaces || {};

  if (provider) {
    if (instances.hasOwnProperty(name)) {
      throw new Error('Cannot override instantiated service "' + name + '"');
    }
    if (!(provider instanceof Function)) {
      throw new Error('Incorrect provider function "' + name + '"');
    }
    providers[name] = provider;
  }
  else {
    if (!providers[name]) {
      throw new Error('Cannot found service provider "' + name + '"');
    }
    if (!instances.hasOwnProperty(name)) {
      instances[name] = new providers[name](service);
    }
    return instances[name];
  }
}

