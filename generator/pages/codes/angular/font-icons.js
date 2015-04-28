angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .font('f', 'custom-iconic-font custom-iconic-font-?')
    ;
  });
