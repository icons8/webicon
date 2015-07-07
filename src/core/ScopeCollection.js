'use strict';

di('ScopeCollection', function(injector) {

  function ScopeCollection() {
    this.collection = [];
  }

  ScopeCollection.prototype = {

    add: function(scope) {
      var
        SvgCumulativeIconSetScope = injector('SvgCumulativeIconSetScope'),
        FontIconSetScope = injector('FontIconSetScope');

      if (scope instanceof SvgCumulativeIconSetScope || scope instanceof FontIconSetScope) {
        this.collection.push(scope);
      }
      else {
        this.collection.unshift(scope);
      }
    },

    preload: function(force) {
      var
        Promise = injector('Promise'),
        promises = [];

      this.collection.forEach(function(item) {
        var
          value;
        value = item.preload(force);
        if (value && typeof value == 'object' && typeof value.then == 'function') {
          promises.push(value);
        }
      });

      if (promises.length > 0) {
        return Promise.all(
          promises.map(function(promise) {
            return promise.then(null, function() {
              return null;
            })
          })
        )
          .then(function() {
            return null;
          });
      }
      else {
        return null;
      }
    },

    getIconScope: function(iconId, params) {
      var
        Promise = injector('Promise'),
        SvgCumulativeIconSetScope = injector('SvgCumulativeIconSetScope'),
        collection = this.collection,
        promise
        ;

      promise = Promise.all(
        collection.map(function(scope) {
          return Promise.resolve(scope.hasIcon(iconId, params))
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

    getIcon: function(iconId, params) {
      return this.getIconScope(iconId, params)
        .then(function(scope) {
          return scope.getIcon(iconId, params);
        });
    }

  };

  return ScopeCollection;

});