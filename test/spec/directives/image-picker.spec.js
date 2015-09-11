'use strict';

describe('Directive: imagePicker', function() {
  var element;
  var scope;
  var compile;
  var block;
  var controller;
  var modal;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  /**
   * Mock la directive
   * @param block
   * @returns {*}
   */
  function imagePicker(block) {
    scope.block = block;
    var directive = compile(
        angular.element('<image-picker block="block"></image-picker>')
    )(scope);

    scope.$apply();

    controller = directive.controller('imagePicker');
    return directive;
  }

  /**
   * Créer un block de type fichier.
   * @param BlockFactory
   */
  function createFile(BlockFactory) {
    var bf = new BlockFactory();
    return bf.create({type:'file'});
  }

  beforeEach(inject(function($rootScope, $modal, BlockFactory, $compile) {
    modal = $modal;
    scope = $rootScope.$new();
    block = createFile(BlockFactory);
    compile = $compile;
    element = imagePicker(block);

    spyOn($modal, 'open').and.returnValue(mockModal);
  }));

  it('doit avoir l\'element block dans le scope', function() {
    expect(controller.block).toEqual(block);
  });

  describe('doit avoir deux attributs dans la directive correspondant au scope', function() {
    describe('si les attributs sont vides', function() {
      // Le scope qu'on a passé n'a pas d'attribut, donc cet attribut doit être nul.
      it('Un attribut correspondant à l\'image courante', function() {
        expect(controller.currentImageUrl).toBeFalsy();
      });

      it('Un attribut correspondant au lien sur l\'image', function() {
        expect(controller.linkForImage).toBeFalsy();
      });
    });

    describe('si les attributs ne sont pas vides', function() {
      var mockAttributes = {};

      beforeEach(function() {
        mockAttributes = {
          url:'http://google.com',
          link:'http://bobelweb.eu/images/image1.jpg'
        };

        block.attributes = mockAttributes;
        element = imagePicker(block);

      });

      it('doit avoir le lien vers l\'image courante ainsi que le lien sur l\'image', function() {
        expect(controller.currentImageUrl).toEqual(mockAttributes.url);
        expect(controller.linkForImage).toEqual(mockAttributes.link);
      });
    });
  });

  it('doit avoir une fonction permettant d\'ouvrir une modal', function() {
    controller.open();
    expect(modal.open).toHaveBeenCalled();
  });

  it('doit avoir une fonction permettant de mettre à jour le lien', function() {
    expect(controller.updateLink()).toBeDefined();
  });
});