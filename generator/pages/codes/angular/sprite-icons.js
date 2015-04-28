angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .sprite('sprite', 'sprite sprite-%')
      .defaultSource('sprite')
    ;
  });
