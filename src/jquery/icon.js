
jQuery.fn.i8icon = I8IconPlugin;

function I8IconPlugin() {
  return this.each(function() {
    var
      I8_ICON_DATA_KEY = '__i8.icon.instance',
      element = $(this),
      instance = element.data(I8_ICON_DATA_KEY);

    if (instance) {
      instance.refresh();
    }
    else {
      element.data(I8_ICON_DATA_KEY, new I8Icon(element));
    }
  });
}

function I8Icon(element) {

}