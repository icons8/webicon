angular.module('app', ['webicon'])
  .config(function($webiconProvider) {
    $webiconProvider
      .icon('department', 'assets/icons/svg/department.svg')
      .icon('iLoveIcons8', 'assets/icons/svg/i-love-icons8.svg')
  });
