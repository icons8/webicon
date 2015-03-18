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

providers.mergeObjectProvider = function() {
  return mergeObjects;
};

providers.PromiseProvider = function() {
  throw new Error('not implemented yet');
};

