'use strict';

function di(name, provider) {
  var
    baseProvider,
    providers;

  providers = di.providers = di.providers || {};

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

