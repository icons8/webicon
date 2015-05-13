'use strict';

di('nodeWrapper', function(injector) {
  var
    jQuery = injector('jQuery');
  return jQuery;
});