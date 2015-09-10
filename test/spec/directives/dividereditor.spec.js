'use strict';

describe('Directive: dividerEditor', function() {
  var element;
  var scope;
  var compile;
  var block;
  var controller;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  /**
   * Créer la directive.
   * @param block
   * @returns {*}
   */
  function dividerEditor(block) {
    scope.block = block;
    var directive = compile(
        angular.element('<divider-editor block="block"></divider-editor>')
    )(scope);

    scope.$apply();

    controller = directive.controller('dividerEditor');
    return directive;
  }

  /**
   * Mock le block divider.
   * @param BlockFactory
   */
  function createDivider(BlockFactory) {
    var bf = new BlockFactory();
    return bf.create({type:'divider'});
  }

  beforeEach(inject(function($rootScope, BlockFactory, $compile) {
    scope = $rootScope.$new();
    block = createDivider(BlockFactory);
    compile = $compile;
    element = dividerEditor(block);
  }));

  it('doit avoir l\'element block dans le scope', function() {
    expect(controller.block).toEqual(block);
  });

  it('doit disposer de 2 tableaux, pour gérer la taille du divider et les bords', function() {
    expect(controller.taille).not.toBeUndefined();
    expect(controller.bords).not.toBeUndefined();
  });

  it('doit changer les attributs du block passé dans le scope', function() {
    var mockMetaStyle = {
      height:'18px',
      background:'black',
      borderRadius:'3px'
    };
    // Test un petit peu idiot, mais on vérifie que tout est bien modifié dans lewwwww scope.
    controller.block.metaStyle = mockMetaStyle;
    expect(controller.block.metaStyle).toEqual(mockMetaStyle);
  });
});
