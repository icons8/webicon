
describe('jquery extensions fontawesome', function() {
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
    element = make('<webicon icon="fa:home spin 2x"></webicon>');
    expect(element.attr('class')).toContain('fa-home fa-spin fa-2x');
  });

});