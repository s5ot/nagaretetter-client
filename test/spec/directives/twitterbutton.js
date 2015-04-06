'use strict';

describe('Directive: TwitterButton', function () {

  // load the directive's module
  beforeEach(module('nagaretetter'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<a twitter-button data-text="HEARTBEAT - TAHITI 80"></a>');
    element = $compile(element)(scope);
    expect(element).not.toBe(null);
  }));
});
