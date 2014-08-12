'use strict';

describe('Service: PlayList', function () {

  // load the service's module
  beforeEach(module('jwaveyarouClientApp'));

  // instantiate service
  var PlayList;
  beforeEach(inject(function (_PlayList_) {
    PlayList = _PlayList_;
  }));

  it('should do something', function () {
    expect(!!PlayList).toBe(true);
  });

});
