'use strict';

describe('Directive: About', function () {

  // load the directive's module
  beforeEach(module('nagaretetter'));

  var $compile, $rootScope;

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should make hidden element visible', function () {
    var element = $compile(angular.element('<a about-popover href="#about"></a>'))($rootScope);
    $rootScope.$digest();
    expect(element).not.toBe(null);
  });
});
