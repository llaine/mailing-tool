'use strict';

describe('Service: block', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var block;
  beforeEach(inject(function (_block_) {
    block = _block_;
  }));

  it('should do something', function () {
    expect(!!block).toBe(true);
  });

});
