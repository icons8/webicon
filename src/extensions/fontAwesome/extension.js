'use strict';

ready(function(service) {
  var
    iconManager = service('iconManager');

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
