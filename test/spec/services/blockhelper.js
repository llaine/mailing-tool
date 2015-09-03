'use strict';

describe('Service: BlockHelper', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var BlockHelper;
  beforeEach(inject(function (_BlockHelper_) {
    BlockHelper = _BlockHelper_;
  }));

  it('should do something', function () {
    expect(!!BlockHelper).toBe(true);
  });

});
