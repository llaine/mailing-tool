'use strict';

describe('Directive: render-style', function() {
  var element;
  var scope;
  var block;
  var styleHelper;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  beforeEach(inject(function($rootScope, StyleHelper, BlockFactory) {
    scope = $rootScope.$new();
    block = mockBlockModels(BlockFactory, false)[0];
    styleHelper = StyleHelper;

    spyOn(scope, '$watch').and.callThrough();
    spyOn(styleHelper, 'applyStyleToDom').and.callThrough();
  }));

  it('doit appeller applyStyleToDom, dès que du HTML est render', inject(function($compile) {
    scope.block = block;

    element = angular.element('<span render-style-on-bound ng-bind-html="block.content"></span>')
    element = $compile(element)(scope);
    scope.$apply();

    expect(scope.$watch).toHaveBeenCalled();
    expect(styleHelper.applyStyleToDom).toHaveBeenCalledWith(scope.block);
  }));
});