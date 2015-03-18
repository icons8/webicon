'use strict';

providers.mergeObjectsProvider = function() {
  return mergeObjects;
};

providers.nodeWrapperProvider = function() {
  return function(node) {
    return angular.element(node);
  }
};
