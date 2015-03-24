'use strict';

ready(function(service) {
  var
    iconManager = service('iconManager');

  iconManager
    .addIconSetAlias('glyphicon', 'gi')
    .addFontIconSet(
      'glyphicon',
      function(name) {
        var
          classBuilder = [
            'glyphicon',
            'glyphicon-' + name
          ];
        return classBuilder.join(' ')
      }
    );

});