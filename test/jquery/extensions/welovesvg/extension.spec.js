
describe('jquery extensions welovesvg', function() {
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

  describe('Material Design Icons', function() {
    beforeEach(function() {
      jasmine.Ajax.stubRequest(
        window.location.protocol + '//cdn.rawgit.com/icons8/welovesvg/b0ef1e007b125c7b02ccaf0e054bd91b19392282/libs/material-design-icons/1.0.2/material-design-icons-24px.svg'
      ).andReturn({
          responseText: '<svg><svg viewBox="0 0 24 24" id="perm-camera-mic"><g icon-name="perm-camera-mic-icon"></g></svg></svg>'
        });
    });

    it('should work', function() {
      element = make('<i8-icon icon="material-icons:perm_camera-mic"></i8-icon>');
      expect(element.html()).toContain('<g icon-name="perm-camera-mic-icon"></g>');
    });
  });


});