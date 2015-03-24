'use strict';

ready(function(di) {
  var
    iconManager = di('iconManager');

  iconManager
    .addFontIconSet(
      'fa',
      function(name, params) {
        var
          classBuilder = [
            'fa',
            'fa-' + name
          ];
        params = params || [];
        Array.prototype.push.apply(
          classBuilder,
          params.map(function(param) {
            return 'fa-'+param
          })
        );
        return classBuilder.join(' ')
      }
    );

});
