'use strict';

di('AbstractScope', function() {

  function AbstractScope(id, options) {
    options = options && typeof options == 'object'
      ? options
      : {};

    this.id = id;
    this.options = options;

    this._iconIdParser = parseIconIdResolver(options.iconIdParser);
    this._iconIdResolver = parseIconIdResolver(options.iconIdResolver);
  }

  AbstractScope.prototype = {

    preload: function() {
      return true;
    },

    hasIcon: function() {
      return true;
    },

    _parseIconId: function(iconId, params) {
      return this._iconIdParser(iconId, params);
    },

    _resolveIconId: function(iconId) {
      return this._iconIdResolver(iconId);
    }

  };

  return AbstractScope;

  function parseIconIdResolver(value) {
    return typeof value == 'function'
      ? value
      : function(value) {
        return value;
      };
  }

});