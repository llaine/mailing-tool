'use strict';

describe('Service: GlobalStyles', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var GlobalStyles;
  beforeEach(inject(function (_GlobalStyles_) {
    GlobalStyles = _GlobalStyles_;
  }));

  it('should do something', function () {
    expect(!!GlobalStyles).toBe(true);
  });

});
