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
   * Créer la directive.
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

  /**
   * Mock la directive
   * @param BlockFactory
   */
  function createButtonBlock(BlockFactory) {
    var bf = new BlockFactory();
    return bf.create({type:'button'});
  }

  beforeEach(inject(function($rootScope, $compile, BlockFactory, $httpBackend) {
    $httpBackend
        .whenGET('http://api.preprod.bobelweb.eu/image')
        .respond(200, []);

    scope = $rootScope.$new();
    compile = $compile;
    blocks = mockBlockModels(BlockFactory, true);
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
      // On change les images, pour
      // celles ayant des liens associés.
      controller.socialImages = SocialImagesMock;
    });

    it('doit contenir les réseaux sociaux ayant un lien', function() {
      controller.updateSocialNetworkOnBlock();
      expect(angular.element(controller.block.content).length).toBe(5);
    });
  });
});
