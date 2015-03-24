'use strict';

service('iconManager')
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