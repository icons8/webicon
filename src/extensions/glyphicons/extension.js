'use strict';

extension(function(injector) {
  var
    iconManager = injector('iconManager');

  iconManager
    .addIconSetAlias('glyphicon', 'gi')
    .addFontIconSet('glyphicon', 'glyphicon glyphicon-?');

});