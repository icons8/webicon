
jQuery.fn.i8icons = i8IconsPlugin;

function i8IconsPlugin(options) {
  var
    elements = this,
    selector = 'i8-icon,[i8-icon],[i8icon],[data-i8-icon],[data-i8icon].i8icon,.i8-icon',
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

  if (!i8IconsPlugin.bootstraped) {
    if (!optionsApplied) {
      i8IconPlugin._applyConfig(options);
    }
    i8IconsPlugin.setBootstrapped();
  }

  return elements;
}

i8IconsPlugin.bootstraped = false;

i8IconsPlugin.cancelBootstrap = function() {
  i8IconsPlugin.bootstraped = true;
};

i8IconsPlugin.isBootstrapped = function() {
  return i8IconsPlugin.bootstraped;
};

i8IconsPlugin.setBootstrapped = function(value) {
  i8IconsPlugin.bootstraped = typeof value == 'undefined'
    ? true
    : value;
};
