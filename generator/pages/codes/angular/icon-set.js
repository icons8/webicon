angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .iconSet('symbol', 'assets/icon-sets/symbol.svg')
      .iconSet('g', 'assets/icon-sets/group.svg')
  });
