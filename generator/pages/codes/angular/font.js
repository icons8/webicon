angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .font('f', 'custom-iconic-font custom-iconic-font-?')
  });
