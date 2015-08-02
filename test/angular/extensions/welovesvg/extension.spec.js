
describe('angular extensions welovesvg', function() {
  var
    element,
    $webiconProvider,
    $compile,
    $templateCache,
    $scope;

  beforeEach(module('webicon', function(_$webiconProvider_) {
    $webiconProvider = _$webiconProvider_;
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
        window.location.protocol + '//cdn.rawgit.com/icons8/welovesvg/78f7305/libs/material-icons/material-icons.svg',
        '<svg><svg viewBox="0 0 24 24" id="perm-camera-mic"><g icon-name="perm-camera-mic-icon"></g></svg></svg>'
      )
    });

    it('should work', function() {
      element = make('<webicon icon="material-icons:perm_camera-mic"></webicon>');
      expect(element.html()).toContain('<g icon-name="perm-camera-mic-icon"></g>');
    });
  });



});