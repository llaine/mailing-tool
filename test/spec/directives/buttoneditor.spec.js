'use strict';

describe('Directive: buttonEditor', function() {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  var element;
  var scope;
  var compile;
  var block;
  var controller;

  /**
   * Créer la directive.
   * @param block
   * @returns {*}
   */
  function mockButtonEditor(block) {
    scope.block = block;
    var directive = compile(
        angular.element('<button-editor block="block"></button-editor>')
    )(scope);

    scope.$apply();

    controller = directive.controller('buttonEditor');
    return directive;
  }

  /**
   * Mock le bouton block.
   * @param BlockFactory
   */
  function createButtonBlock(BlockFactory) {
    var bf = new BlockFactory();
    return bf.create({type:'button'});
  }

  beforeEach(inject(function($rootScope, BlockFactory, $compile) {
    scope = $rootScope.$new();
    block = createButtonBlock(BlockFactory);
    compile = $compile;
    element = mockButtonEditor(block);
    controller.options = mockOptionsBtnEditor;

  }));

  it('doit avoir un block dans le scope', function() {
    expect(controller.block).toEqual(block);
  });

  it('doit avoir une fonction permettant de changer les atributs du bouton', function() {
    controller.changes();
    expect(controller.block.attributes.btn).toEqual(mockOptionsBtnEditor);
  });

  it('la taille du bouton doit augmenter en fonction de la taille du text', function() {
    var previousLength = controller.options.width;
    controller.options.txt += 'toto';
    scope.$digest();
    expect(controller.options.width).toBeGreaterThan(previousLength);
  });
});
