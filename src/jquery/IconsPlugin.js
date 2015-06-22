'use strict';

di('IconsPlugin', function(injector) {

  function IconsPlugin(options) {
    var
      configPerformer = injector('configPerformer'),
      elements = this,
      selector = 'webicon,[webicon],[data-webicon],.webicon',
      optionsApplied = false;

    if (elements.is(selector)) {
      elements.webicon(options);
      optionsApplied = true;
    }
    elements.find(selector).webicon(
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
