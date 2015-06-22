
describe('icon', function() {
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

  describe('svg format', function() {

    beforeEach(function() {
      jasmine.Ajax.stubRequest('assets/icons/clock.svg').andReturn({
        responseText: '<svg><g id="clock-icon"></g></svg>'
      });
      options = {
        icons: {
          clock: 'assets/icons/clock.svg'
        }
      };
    });

    it('should load icon', function() {
      element = make('<webicon icon="clock"></webicon>');
      expect(element.html()).toContain('<g id="clock-icon"></g>');
    });

  });

});