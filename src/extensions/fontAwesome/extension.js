'use strict';

service('iconManager')
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