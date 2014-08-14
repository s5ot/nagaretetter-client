'use strict';

describe('Directive: rankingChart', function () {

  // load the directive's module
  beforeEach(module('jwaveyarouClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ranking-chart></ranking-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rankingChart directive');
  }));
});
