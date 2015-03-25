'use strict';

di('ScopeCollection', function(di) {

  function ScopeCollection() {
    this.collection = [];
  }

  ScopeCollection.prototype = {

    add: function(scope) {
      var
        SvgCumulativeIconSetScope = di('SvgCumulativeIconSetScope'),
        FontIconSetScope = di('FontIconSetScope');

      if (scope instanceof SvgCumulativeIconSetScope || scope instanceof FontIconSetScope) {
        this.collection.push(scope);
      }
      else {
        this.collection.unshift(scope);
      }
    },

    preLoad: function() {
      var
        Promise = di('Promise');

      return Promise.all(
        this.collection.map(function(item) {
          return Promise.resolve(item.preLoad(iconId))
            .then(null, function() {
              return false;
            })
        })
      )
        .then(function() {
          return true;
        }, function() {
          return false;
        });
    },

    getIconScope: function(iconId) {
      var
        Promise = di('Promise'),
        SvgCumulativeIconSetScope = di('SvgCumulativeIconSetScope'),
        collection = this.collection,
        promise
        ;

      promise = Promise.all(
        collection.map(function(scope) {
          return Promise.resolve(scope.hasIcon(iconId))
            .then(function(value) {
              return value
                ? scope
                : false;
            }, function() {
              return false;
            })
        })
      );

      return promise.then(function(scopes) {
        var
          index;
        for (index = 0; index < scopes.length; index++) {
          if (scopes[index]) {
            return scopes[index];
          }
        }
        return Promise.reject();
      });
    },

    getIcon: function(iconId) {
      return this.getIconScope(iconId)
        .then(function(scope) {
          return scope.getIcon(iconId);
        });
    }

  };

  return ScopeCollection;

});