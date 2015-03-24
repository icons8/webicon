'use strict';

function bootstrap() {

  jQuery(function() {
    var
      BOOTSTRAP_DELAY = 5,
      timeout = service('timeout');

    if (IconsPlugin.bootstraped) {
      return;
    }

    timeout(BOOTSTRAP_DELAY).then(function() {
      if (IconsPlugin.bootstraped) {
        return;
      }
      jQuery(window.document).i8icons();
    });

  });

}
