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
        index,
        prefixes,
        prefix,
        id = null;

      prefixes = ['', 'i8-', 'i8', 'i8:'];
      for (index = 0; !id && index < prefixes.length; index++) {
        prefix = prefixes[index];
        id = element.attr(prefix + 'icon') || element.data(prefix + 'icon');
      }

      if (!id) {
        id = element
          .attr('class')
          .split(/\s+/)
          .map(function(className) {
            var
              match,
              parts;
            match = /^i8[-:]?icon[-:]([^;|,]+)[;|,]?(.*)$/i.exec(className);
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



