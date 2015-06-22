'use strict';

ready(function bootstrap(injector) {
  var
    jQuery = injector('jQuery'),
    IconsPlugin = injector('IconsPlugin');

  jQuery(function() {
    var
      BOOTSTRAP_DELAY = 5,
      timeout = injector('timeout');

    if (IconsPlugin.bootstraped) {
      return;
    }

    timeout(BOOTSTRAP_DELAY).then(function() {
      if (IconsPlugin.bootstraped) {
        return;
      }
      jQuery(window.document).webicons();
    });

  });

});
