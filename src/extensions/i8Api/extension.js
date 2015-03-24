'use strict';

ready(function(service) {
  var
    iconManager = service('iconManager');

  iconManager
    .setDefaultIconSet('i8')
    .addSvgIconSet(
      'i8',
      function(icons) {
        var
          options = {
            url: service('i8ApiConfig').gateway.url,
            params: {}
          };

        if (icons) {
          if (!Array.isArray(icons)) {
            icons = [icons];
          }
          options.params.icons = icons.join(',');
        }
        return options;
      },
      {
        cumulative: true
      }
    );

});

