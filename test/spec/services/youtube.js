'use strict';

describe('Service: YouTube', function () {

  // load the service's module
  beforeEach(module('jwaveyarouClientApp'));

  // instantiate service
  var YouTube;
  beforeEach(inject(function (_YouTube_) {
    YouTube = _YouTube_;
  }));

  it('should do something', function () {
    expect(!!YouTube).toBe(true);
  });

});
