angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .svgSet('symbol', 'assets/icon-sets/symbol.svg')
      .svgSet('g', 'assets/icon-sets/group.svg')
  });
