'use strict';

describe('Directive: rankingChart', function () {

  // load the directive's module
  beforeEach(module('nagaretetter'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div ranking-chart class="analysis-main"></div>');
    element = $compile(element)(scope);
    expect(element.text()).not.toBe(null);
  }));
});
