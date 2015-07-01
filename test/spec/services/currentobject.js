'use strict';

describe('Service: currentObject', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var currentObject;
  beforeEach(inject(function (_currentObject_) {
    currentObject = _currentObject_;
  }));

  it('should do something', function () {
    expect(!!currentObject).toBe(true);
  });

});
