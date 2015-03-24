'use strict';

service('AbstractScope', function() {

  function AbstractScope(id) {
    this.id = id;
  }

  AbstractScope.prototype = {

    preLoad: function() {
      return true;
    },

    hasIcon: function() {
      return true;
    }

  };

  return AbstractScope;

});