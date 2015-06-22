'use strict';

di('IconPlugin', function(injector) {
  var
    jQuery = injector('jQuery');

  return function(config) {
    var
      configPerformer = injector('configPerformer'),
      IconController = injector('IconController'),
      IconsPlugin = injector('IconsPlugin');

    config = config || {};

    if (typeof config == 'string') {
      config = {
        icon: config
      };
    }

    configPerformer(config);

    if (!IconsPlugin.bootstraped) {
      IconsPlugin.cancelBootstrap();
    }

    return this.each(function() {
      var
        WEBICON_DATA_KEY = '__WEBICON_DATA',
        element = jQuery(this),
        instance = element.data(WEBICON_DATA_KEY),
        options = {
          icon: config.icon + ''
        };

      if (instance) {
        instance.refresh(options);
      }
      else {
        element.data(WEBICON_DATA_KEY, new IconController(element, options));
      }
    });
  }

});



