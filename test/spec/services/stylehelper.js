'use strict';

describe('Service: styleHelper', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var styleHelper;
  beforeEach(inject(function (_styleHelper_) {
    styleHelper = _styleHelper_;
  }));

  it('should do something', function () {
    expect(!!styleHelper).toBe(true);
  });

});
