angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .icon('clock', 'assets/icons/png/clock.png')
      .icon('calendar', 'assets/icons/png/calendar.png')
  });
