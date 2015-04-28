angular.module('app')
  .config(function($i8IconProvider) {
    $i8IconProvider
      .iconSet('symbol', 'assets/icon-sets/symbol/icon-set.svg')
      .iconSet('g', 'assets/icon-sets/group/icon-set.svg')
    ;
  });
