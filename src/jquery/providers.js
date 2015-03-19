'use strict';

providers.logProvider = function() {
  return log;
};

providers.nodeWrapperProvider = function() {
  return jQuery;
};

providers.timeoutProvider = function() {
  return timeout;
};

providers.httpGetProvider = function() {
  return httpGet;
};

providers.mergeObjectsProvider = function() {
  return mergeObjects;
};

providers.PromiseProvider = function() {
  return Promise;
};

