'use strict';

describe('Service: BlocksManipulator', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var BlocksManipulator;
  beforeEach(inject(function (_BlocksManipulator_) {
    BlocksManipulator = _BlocksManipulator_;
  }));

  it('should do something', function () {
    expect(!!BlocksManipulator).toBe(true);
  });

});
