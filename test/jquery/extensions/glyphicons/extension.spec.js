
describe('jquery extensions glyphicons', function() {
  var
    element,
    options;

  jQuery.fn.i8icons.cancelBootstrap();

  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  function make(html, opts) {
    var
      element;
    element = jQuery(html);
    element.i8icons(opts || options);
    return element;
  }

  it('should work', function() {
    element = make('<i8-icon icon="gi:home"></i8-icon>');
    expect(element.attr('class')).toContain('glyphicon glyphicon-home');
  });

});