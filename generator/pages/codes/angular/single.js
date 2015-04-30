angular.module('app', ['i8.icon'])
  .config(function($i8IconProvider) {
    $i8IconProvider
      .icon('department', 'assets/icons/svg/department.svg')
      .icon('iLoveIcons8', 'assets/icons/svg/i-love-icons8.svg')
  });
