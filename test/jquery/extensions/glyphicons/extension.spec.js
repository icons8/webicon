
describe('jquery extensions glyphicons', function() {
  var
    element,
    options;

  jQuery.fn.webicons.cancelBootstrap();

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
    element.webicons(opts || options);
    return element;
  }

  it('should work', function() {
    element = make('<webicon icon="gi:home"></webicon>');
    expect(element.attr('class')).toContain('glyphicon glyphicon-home');
  });

});