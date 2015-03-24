'use strict';

service('parseSvgOptions', function(service) {

  return function parseSvgOptions(options) {
    var
      iconSize,
      viewBox;

    if (options) {
      switch(typeof options) {
        case 'number':
          iconSize = options;
          break;
        case 'string':
          viewBox = options;
          break;
      }
    }
    else {
      options = {};
    }

    return {
      iconSize: iconSize || options.iconSize,
      viewBox: viewBox || options.viewBox
    }
  }

});