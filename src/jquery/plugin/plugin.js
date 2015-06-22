'use strict';

var
  injector = createInjector(function(injector) {
    injector('jQuery', function() {
      return jQuery;
    })
  });

jQuery.fn.webicon = injector('IconPlugin');
jQuery.fn.webicon.extension = injector('ready');

jQuery.fn.webicons = injector('IconsPlugin');
jQuery.fn.webicons.extension = injector('ready');
