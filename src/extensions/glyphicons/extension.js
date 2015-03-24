'use strict';

ready(function(di) {
  var
    iconManager = di('iconManager');

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