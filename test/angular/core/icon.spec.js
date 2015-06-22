
describe('icon', function() {
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

  beforeEach(function() {
    inject(function(_$compile_, _$templateCache_, _$rootScope_){
      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_;
    });
  });

  describe('svg format', function() {

    beforeEach(inject(function() {
      $webiconProvider
        .icon('clock', 'assets/icons/clock.svg')
      ;

      $templateCache.put('assets/icons/clock.svg', '<svg><g id="clock-icon"></g></svg>')
    }));

    it('should load icon', inject(function() {
      element = make('<webicon icon="clock"></webicon>');
      expect(element.html()).toContain('<g id="clock-icon"></g>');
    }));

  });

});