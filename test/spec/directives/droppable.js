'use strict';

describe('Directive: droppable', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<droppable></droppable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the droppable directive');
  }));
});
