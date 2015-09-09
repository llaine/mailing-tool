'use strict';

describe('Directive: textEditor', function() {
  var element;
  var scope;
  var compile;
  var block;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  /**
   * Créer la directive text-editor
   * @param block
   * @returns {*}
   */
  function createDirective(block) {
    scope.block = block;
    var directive = angular.element('<text-editor block="block"></text-editor>');
    directive = compile(directive)(scope);
    scope.$apply();
    return directive;
  }

  beforeEach(inject(function($rootScope, $compile, BlockFactory) {
    scope = $rootScope.$new();
    compile = $compile;
    block = mockBlockModels(BlockFactory, false)[0];
    element = createDirective(block);
  }));

  it('doit avoir un block dans le scope', function() {
    expect(scope.block).toEqual(block);
  });

  xit('doit avoir des attributs correspondant à ckEditor', function() {
    var ckEditorOps = {
      language:'fr',
      allowedContent:true,
      entities:false
    };
    expect(scope.options).toEqual(ckEditorOps);
  });
});
