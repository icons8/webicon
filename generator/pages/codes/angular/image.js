angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .icon('clock', 'assets/icons/png/clock.png')
      .icon('calendar', 'assets/icons/png/calendar.png')
  });
