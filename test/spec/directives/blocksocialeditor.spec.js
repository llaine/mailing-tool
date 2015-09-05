'use strict';

describe('Directive: blockSocialEditor', function() {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  var element;
  var scope;
  var compile;
  var blocks;
  var controller;

  /**
   *
   * @param block
   * @returns {*}
   */
  function mockBlockSocialEditor(block) {
    scope.block = block;

    var directive = compile(
        angular.element('<block-social-editor block="block"></block-social-editor>')
        )(scope);

    scope.$apply();

    controller = directive.controller('blockSocialEditor');
    return directive;
  }

  beforeEach(inject(function($rootScope, $compile, BlockFactory) {
    scope = $rootScope.$new();
    compile = $compile;
    blocks = mockBlockModels(BlockFactory, false);
    element = mockBlockSocialEditor(blocks[0]);

  }));

  it('doit avoir un block dans le scope', function() {
    expect(controller.block).toEqual(blocks[0]);
  });

  it('doit avoir des images dans le scope', function() {
    expect(controller.socialImages).toBeDefined();
    expect(controller.socialImages.length).toBeGreaterThan(0);
  });

  describe('doit avoir une fonction permettant de mettre à jour les liens sociaux', function() {
    beforeEach(function() {

    });

    it('', function() {

    });
  });
});
