'use strict';

di('AbstractScope', function() {

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