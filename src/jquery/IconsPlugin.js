'use strict';

di('IconsPlugin', function(injector) {

  function IconsPlugin(options) {
    var
      configPerformer = injector('configPerformer'),
      elements = this,
      selector = 'i8-icon,i8icon,[i8-icon],[i8icon],[data-i8-icon],[data-i8icon],.i8icon,.i8-icon',
      optionsApplied = false;

    if (elements.is(selector)) {
      elements.i8icon(options);
      optionsApplied = true;
    }
    elements.find(selector).i8icon(
      optionsApplied
        ? null
        : options
    );

    if (!IconsPlugin.bootstraped) {
      if (!optionsApplied) {
        configPerformer(options);
      }
      IconsPlugin.setBootstrapped();
    }

    return elements;
  }

  IconsPlugin.bootstraped = false;

  IconsPlugin.cancelBootstrap = function() {
    IconsPlugin.bootstraped = true;
  };

  IconsPlugin.isBootstrapped = function() {
    return IconsPlugin.bootstraped;
  };

  IconsPlugin.setBootstrapped = function(value) {
    IconsPlugin.bootstraped = typeof value == 'undefined'
      ? true
      : value;
  };

  return IconsPlugin;

});
