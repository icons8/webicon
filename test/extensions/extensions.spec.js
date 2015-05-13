
describe('extensions', function() {
  describe('angular', function() {
    var
      element,
      $i8IconProvider,
      $compile,
      $templateCache,
      $scope;

    beforeEach(module('i8.icon', function(_$i8IconProvider_) {
      $i8IconProvider = _$i8IconProvider_;
    }));

    function make(html) {
      var
        element;
      element = $compile(html)($scope);
      $scope.$digest();
      return element;
    }

    beforeEach(inject(function(_$compile_, _$templateCache_, _$rootScope_){
      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_;
    }));

    describe('Font Awesome', function() {

      it('should work', function() {
        element = make('<i8-icon icon="fa:home spin 2x"></i8-icon>');
        expect(element.attr('class')).toContain('fa-home fa-spin fa-2x');
      });

    });

    describe('Glyphicons', function() {

      it('should work', function() {
        element = make('<i8-icon icon="gi:home"></i8-icon>');
        expect(element.attr('class')).toContain('glyphicon glyphicon-home');
      });

    });

    describe('Material Design Icons', function() {
      beforeEach(function() {
        $templateCache.put(
          window.location.protocol + '//cdn.rawgit.com/google/material-design-icons/1.0.1/sprites/svg-sprite/svg-sprite-action.svg',
          '<svg><svg viewBox="0 0 24 24" id="ic_perm_camera_mic_24px"><g id="perm-camera-mic-icon"></g></svg></svg>'
        )
      });

      it('should work', function() {
        element = make('<i8-icon icon="md-action:perm_camera-mic"></i8-icon>');
        expect(element.html()).toContain('<g id="perm-camera-mic-icon"></g>');
      });
    });

  });

  describe('jquery', function() {
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

    describe('Font Awesome', function() {
      it('should work', function() {
        element = make('<i8-icon icon="fa:home spin 2x"></i8-icon>');
        expect(element.attr('class')).toContain('fa-home fa-spin fa-2x');
      });
    });

    describe('Glyphicons', function() {
      it('should work', function() {
        element = make('<i8-icon icon="gi:home"></i8-icon>');
        expect(element.attr('class')).toContain('glyphicon glyphicon-home');
      });
    });

    describe('Material Design Icons', function() {
      beforeEach(function() {
        jasmine.Ajax.stubRequest(
          window.location.protocol + '//cdn.rawgit.com/google/material-design-icons/1.0.1/sprites/svg-sprite/svg-sprite-action.svg'
        ).andReturn({
          responseText: '<svg><svg viewBox="0 0 24 24" id="ic_perm_camera_mic_24px"><g id="perm-camera-mic-icon"></g></svg></svg>'
        });
      });

      it('should work', function() {
        element = make('<i8-icon icon="md-action:perm_camera-mic"></i8-icon>');
        expect(element.html()).toContain('<g id="perm-camera-mic-icon"></g>');
      });
    });

  });

});