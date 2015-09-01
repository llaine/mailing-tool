'use strict';

describe('Service: DraggableHelper', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var DraggableHelper;
  beforeEach(inject(function (_DraggableHelper_) {
    DraggableHelper = _DraggableHelper_;
  }));

  it('should do something', function () {
    expect(!!DraggableHelper).toBe(true);
  });

});
