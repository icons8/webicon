angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .sprite('s', 'sprite sprite-%')
      .defaultSource('s')
  });
