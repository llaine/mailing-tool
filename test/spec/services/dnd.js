'use strict';

describe('Service: DnD', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var DnD;
  beforeEach(inject(function (_DnD_) {
    DnD = _DnD_;
  }));

  it('should do something', function () {
    expect(!!DnD).toBe(true);
  });

});
