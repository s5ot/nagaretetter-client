'use strict';

describe('Directive: Twitter', function () {

  // load the directive's module
  beforeEach(module('jwaveyarouClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-twitter></-twitter>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Twitter directive');
  }));
});
