'use strict';

var
  injector = createInjector(function(injector) {
    injector('jQuery', function() {
      return jQuery;
    })
  });

jQuery.fn.i8icon = injector('IconPlugin');
jQuery.fn.i8icon.extension = injector('ready');

jQuery.fn.i8icons = injector('IconsPlugin');
jQuery.fn.i8icons.extension = injector('ready');
