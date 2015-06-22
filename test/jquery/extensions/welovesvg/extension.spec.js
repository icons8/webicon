
describe('jquery extensions welovesvg', function() {
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

  describe('Material Design Icons', function() {
    beforeEach(function() {
      jasmine.Ajax.stubRequest(
        window.location.protocol + '//cdn.rawgit.com/icons8/welovesvg/c10018bec3184a8b72a3d6485904c1eba4dc876f/libs/material-design-icons/1.0.2/material-design-icons-24px.svg'
      ).andReturn({
          responseText: '<svg><svg viewBox="0 0 24 24" id="perm-camera-mic"><g icon-name="perm-camera-mic-icon"></g></svg></svg>'
        });
    });

    it('should work', function() {
      element = make('<webicon icon="material-icons:perm_camera-mic"></webicon>');
      expect(element.html()).toContain('<g icon-name="perm-camera-mic-icon"></g>');
    });
  });


});