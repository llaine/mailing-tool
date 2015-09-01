'use strict';

describe('Directive: editBtnBlock', function () {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-btn-block></edit-btn-block>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editBtnBlock directive');
  }));
});
