'use strict';

hljs.initHighlightingOnLoad();

angular
  .module('demo', ['i8.icon'])

  .directive('scope', [
    function() {
      return {
        priority: 500,
        scope: true
      }
    }
  ])

  .factory('localStorage', function($window) {
    try {
      return $window.localStorage;
    }
    catch(e) {
      return {};
    }
  })

  .run(function($rootScope, localStorage) {
    var
      active = null;

    try {
      active = localStorage.active;
    }
    catch(e) {}

    active = ['jquery', 'angular'].indexOf(active) != -1
      ? active
      : 'jquery';

    $rootScope.active = active;

    $rootScope.$watch('active', function(active) {
      try {
        localStorage.active = active;
      }
      catch(e) {}
    });
  });
