'use strict';

describe('Directive: buttonEditor', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<button-editor></button-editor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the buttonEditor directive');
  }));
});
