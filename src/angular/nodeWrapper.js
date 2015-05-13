'use strict';

di('nodeWrapper', function(injector) {
  var
    angular = injector('angular');
  return angular.element;
});