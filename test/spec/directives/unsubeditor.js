'use strict';

describe('Directive: linkEditor', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<unsub-editor></unsub-editor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the linkEditor directive');
  }));
});
