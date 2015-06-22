
describe('angular extensions welovesvg', function() {
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

  describe('Material Design Icons', function() {
    beforeEach(function() {
      $templateCache.put(
        window.location.protocol + '//cdn.rawgit.com/icons8/welovesvg/b0ef1e007b125c7b02ccaf0e054bd91b19392282/libs/material-design-icons/1.0.2/material-design-icons-24px.svg',
        '<svg><svg viewBox="0 0 24 24" id="perm-camera-mic"><g icon-name="perm-camera-mic-icon"></g></svg></svg>'
      )
    });

    it('should work', function() {
      element = make('<i8-icon icon="material-icons:perm_camera-mic"></i8-icon>');
      expect(element.html()).toContain('<g icon-name="perm-camera-mic-icon"></g>');
    });
  });



});