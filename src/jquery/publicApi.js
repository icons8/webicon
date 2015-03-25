'use strict';

di('publicApi', function(di, publicApi) {
  var
    iconManager = di('iconManager');

  publicApi.preload = function() {
    iconManager.preload();
    return this;
  };

  return publicApi;
});