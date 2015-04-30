angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .sprite('s', 'sprite sprite-%')
      .defaultSource('s')
  });
