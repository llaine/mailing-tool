'use strict';

describe('Directive: liveEditor', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<live-editor></live-editor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the liveEditor directive');
  }));
});
