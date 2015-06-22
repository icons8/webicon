
describe('angular extensions fontawesome', function() {
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

  it('should work', function() {
    element = make('<webicon icon="fa:home spin 2x"></webicon>');
    expect(element.attr('class')).toContain('fa-home fa-spin fa-2x');
  });

});