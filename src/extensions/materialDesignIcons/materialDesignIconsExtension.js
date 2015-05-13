'use strict';

function materialDesignIconsExtension(di, config) {
  var
    iconManager = di('iconManager'),
    iconIdFilter,
    options;

  iconIdFilter = function(id) {
    return String(id || '')
      .replace(/_/g, '-')
      .replace(/^ic-/, '')
      .replace(/-\d+px$/, '');
  };

  options = {
    iconIdResolver: iconIdFilter,
    iconIdParser: iconIdFilter,
    preloadable: false
  };

  config.categories
    .forEach(function(category) {
      iconManager.addSvgIconSet(
        'md-' + category,
        '//cdn.rawgit.com/google/material-design-icons/' + config.version + '/sprites/svg-sprite/svg-sprite-' + category + '.svg',
        options
      )
    });

}