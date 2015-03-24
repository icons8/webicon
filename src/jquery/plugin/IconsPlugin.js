'use strict';

function IconsPlugin(options) {
  var
    elements = this,
    selector = 'i8-icon,i8icon,[i8-icon],[i8icon],[data-i8-icon],[data-i8icon].i8icon,.i8-icon',
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
      IconPlugin._applyConfig(options);
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
