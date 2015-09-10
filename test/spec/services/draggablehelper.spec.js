'use strict';

describe('Service: DraggableHelper', function() {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var DraggableHelper;
  beforeEach(inject(function(_DraggableHelper_) {
    DraggableHelper = _DraggableHelper_;
  }));

  it('doit avoir une fonction permettant de récupérer la position d\'un élement', function() {
    expect(DraggableHelper.getPositionOfElement).toBeDefined();
  });

});
