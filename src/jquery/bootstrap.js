
jQuery(function() {
  var
    ASYNC_DELAY = 5,
    timeout = getService('timeout');

  if (isBootstrapped()) {
    return;
  }

  timeout(ASYNC_DELAY).then(function() {
    if (isBootstrapped()) {
      return;
    }
    jQuery(document).i8icons();
  });

  function isBootstrapped() {
    return jQuery.fn.i8icons.isBootstrapped();
  }
});
