'use strict';

describe('Service: AviaryEditor', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var AviaryEditor;
  beforeEach(inject(function (_AviaryEditor_) {
    AviaryEditor = _AviaryEditor_;
  }));

  it('should do something', function () {
    expect(!!AviaryEditor).toBe(true);
  });

});
