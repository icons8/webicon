'use strict';

di('IconController', function(injector) {

  function IconController(element, options) {
    var
      initIconElement = injector('initIconElement');

    options = options || {};
    this._element = element;
    this.options = options;

    initIconElement(element, this._getAlt(), this._getIconId());
    this._renderIcon();
  }

  IconController.prototype = {

    _getAlt: function() {
      var
        element = this._element,
        altAttr = element.attr('alt'),
        altData = element.data('alt');

      if (altAttr === '' || altData === '' || this.options.alt === '') {
        return '';
      }
      return altAttr || altData || this.options.alt;
    },

    _getIconId: function() {
      var
        element = this._element,
        id;

      id = element.attr('webicon') || element.data('webicon');
      if (!id && element[0].tagName.toLowerCase() == 'webicon') {
        id = element.attr('icon') || element.data('icon');
      }

      if (!id) {
        id = element
          .attr('class')
          .split(/\s+/)
          .map(function(className) {
            var
              match,
              parts;
            match = /^webicon[-:]([^;|,]+)[;|,]?(.*)$/i.exec(className);
            if (!match || !match[1]) {
              return null;
            }
            parts = [match[1]];
            if (match[2]) {
              Array.prototype.push.apply(parts, match[2].split(/[;|,:]/));
            }
            return parts.join(' ');
          })
          .filter(function(iconId) {
            return iconId;
          })
          [0];
      }

      return id || this.options.icon;
    },

    _renderIcon: function(iconId) {
      var
        iconManager = injector('iconManager'),
        element = this._element,
        cleaner = this._renderedIconCleaner,
        self = this;

      iconId = iconId || this._getIconId();

      if (iconId == this._renderedIconId) {
        return;
      }

      cleaner && cleaner();
      this._renderedIconCleaner = null;
      if (iconId) {
        iconManager.getIcon(iconId).then(function(icon) {
          self._renderedIconCleaner = icon.render(element);
        });
      }

      this._renderedIconId = iconId;
    },

    refresh: function(options) {
      var
        iconId;

      iconId = this.options.icon;
      this.options = options;
      this.options.icon = this.options.icon || iconId;

      this._renderIcon();
    }

  };

  return IconController;

});



