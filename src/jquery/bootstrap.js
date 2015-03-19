
jQuery(function() {
  console.log('bootstrap canceled');
  return;

  var
    ASYNC_DELAY = 5,
    timeout = getService('timeout');

  timeout(ASYNC_DELAY).then(function() {
    jQuery('i8-icon, [i8-icon]').i8icon();
  });

});