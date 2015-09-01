'use strict';

describe('Filter: stylish', function () {

  // load the filter's module
  beforeEach(module('newsletterEditorApp'));

  // initialize a new instance of the filter before each test
  var stylish;
  beforeEach(inject(function ($filter) {
    stylish = $filter('stylish');
  }));

  it('should return the input prefixed with "stylish filter:"', function () {
    var text = 'angularjs';
    expect(stylish(text)).toBe('stylish filter: ' + text);
  });

});
