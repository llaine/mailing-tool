'use strict';

describe('Directive: settingsPanel', function() {


  beforeEach(module('my.templates'));
  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('doit afficher la liste des élements', inject(function($compile) {
    element = angular.element('<settings-panel></settings-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(scope.availableBlocks.length).not.toBe(0);
  }));
});
