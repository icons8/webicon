angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .defaultSvgSetUrl('assets/icon-sets/colorless.svg')
  });
