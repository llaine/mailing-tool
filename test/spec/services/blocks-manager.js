'use strict';

describe('Service: BlocksManager', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var BlocksManager;
  beforeEach(inject(function (_BlocksManager_) {
    BlocksManager = _BlocksManager_;
  }));

  it('should do something', function () {
    expect(!!BlocksManager).toBe(true);
  });

});
