'use strict';

describe('Directive: whenScrolled', function () {

  // load the directive's module
  beforeEach(module('nagaretetter'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div when-scrolled></div>');
    element = $compile(element)(scope);
    expect(element.text()).not.toBe(null);
  }));
});
