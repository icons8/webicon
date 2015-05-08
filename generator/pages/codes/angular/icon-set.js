angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .svgSet('symbol', 'assets/icon-sets/symbol.svg')
      .svgSet('g', 'assets/icon-sets/group.svg')
  });
