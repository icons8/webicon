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
  ]);
