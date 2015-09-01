'use strict';

describe('Service: fileManager', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var fileManager;
  beforeEach(inject(function (_fileManager_) {
    fileManager = _fileManager_;
  }));

  it('should do something', function () {
    expect(!!fileManager).toBe(true);
  });

});
