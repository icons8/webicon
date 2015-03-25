'use strict';

di('mergeObjects', function() {

  return function mergeObjects(to /*, from [, from[, ...]]*/) {
    var
      args = Array.prototype.slice.call(arguments);
    if (args.length == 0) {
      return {};
    }
    if (args.length < 2) {
      if (!Array.isArray(to)) {
        return to;
      }
      args = to;
      to = args[0];
    }
    args.slice(1).forEach(function(from) {
      to = _merge(to, from);
    });
    return to;

    function _merge(to, from) {
      if (!to || !from || typeof to != 'object' || typeof from != 'object' || Array.isArray(to) || Array.isArray(from)) {
        return from;
      }
      Object.keys(from).forEach(function(key) {
        if (to.hasOwnProperty(key)) {
          to[key] = _merge(to[key], from[key]);
        }
        else {
          to[key] = from[key];
        }
      });
      return to;
    }
  };

});

