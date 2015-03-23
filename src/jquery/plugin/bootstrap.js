'use strict';

function bootstrap() {

  jQuery(function() {
    var
      ASYNC_DELAY = 5,
      timeout = service('timeout');

    if (IconsPlugin.bootstraped) {
      return;
    }

    timeout(ASYNC_DELAY).then(function() {
      if (IconsPlugin.bootstraped) {
        return;
      }
      jQuery(window.document).i8icons();
    });

  });

}
