'use strict';

angular
  .module('i8.icon')
  .provider('$i8Icon', I8IconProvider);


function I8IconProvider() { }

I8IconProvider.prototype = {

  $get : ['$http', '$q', '$log', '$templateCache', function($http, $q, $log, $templateCache) {
    return new I8IconService(config, $http, $q, $log, $templateCache);
  }]

};


function I8IconService(config, $http, $q, $log, $templateCache) {
  var iconCache = {};

}