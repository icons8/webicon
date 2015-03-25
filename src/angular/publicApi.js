'use strict';

di('publicApi', function(di, publicApi) {
  delete publicApi.preload;
  return publicApi;
});