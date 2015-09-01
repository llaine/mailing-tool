'use strict';

describe('Service: DomManipulator', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var DomManipulator;
  beforeEach(inject(function (_DomManipulator_) {
    DomManipulator = _DomManipulator_;
  }));

  it('should do something', function () {
    expect(!!DomManipulator).toBe(true);
  });

});
