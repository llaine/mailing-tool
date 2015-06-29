'use strict';

describe('Service: Blocks', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var Blocks;
  beforeEach(inject(function (_Blocks_) {
    Blocks = _Blocks_;
  }));

  it('should do something', function () {
    expect(!!Blocks).toBe(true);
  });

});
