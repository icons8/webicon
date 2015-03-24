'use strict';

ready(function(di) {
  var
    iconManager = di('iconManager');

  iconManager
    .setDefaultIconSet('i8')
    .addSvgIconSet(
      'i8',
      function(icons) {
        var
          options = {
            url: di('i8ApiConfig').gateway.url,
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

