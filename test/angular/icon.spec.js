
describe('icon', function() {
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

  beforeEach(function() {
    inject(function(_$compile_, _$templateCache_, _$rootScope_){
      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_;
    });
  });

  describe('svg format', function() {

    beforeEach(inject(function() {
      $i8IconProvider
        .icon('clock', 'assets/icons/clock.svg')
      ;

      $templateCache.put('assets/icons/clock.svg', '<svg><g id="clock-icon"></g></svg>')
    }));

    it('should load icon', inject(function() {
      element = make('<i8-icon icon="clock"></i8-icon>');
      expect(element.html()).toContain('<g id="clock-icon"></g>');
    }));

  });

});