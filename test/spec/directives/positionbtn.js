'use strict';

describe('Directive: positionBtn', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<position-btn></position-btn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the positionBtn directive');
  }));
});
