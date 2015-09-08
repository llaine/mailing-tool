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
        angular.element('<link-editor block="block"></link-editor>')
    )(scope);

    scope.$apply();

    controller = directive.controller('linkEditor');
    return directive;
  }

  /**
   * Mock le block divider.
   * @param BlockFactory
   * @param type
   */
  function createDivider(BlockFactory, type) {
    var bf = new BlockFactory();
    return bf.create({type: type});
  }

  beforeEach(inject(function($rootScope, BlockFactory, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  describe('Block de type lien de désinscription', function() {
    var mockLinkAttributes = {};
    beforeEach(inject(function(BlockFactory) {
      mockLinkAttributes = {
        txt:'toto',
        dispo:'left'
      };

      block = createDivider(BlockFactory, 'unsub');
      block.attributes.link = mockLinkAttributes;
      element = dividerEditor(block);
    }));

    it('doit avoir l\'element block dans le scope', function() {
      expect(controller.block).toEqual(block);
    });

    it('doit avoir deux attributs dans le scope correspondant aux options', function() {
      expect(controller.options.txt).toEqual(mockLinkAttributes.txt);
      expect(controller.options.dispo).toEqual(mockLinkAttributes.dispo);
    });

    it('doit avoir une fonction permettant de modifier les attributs de l\'element du scope', function() {
      var mockOptionsCtrl = {
        txt:'Cliquez sur mon super lien',
        dispo:'right'
      };

      controller.options = mockOptionsCtrl;

      controller.changes();

      expect(controller.block.attributes.link.txt).toEqual(mockOptionsCtrl.txt)
      expect(controller.block.attributes.link.dispo).toEqual(mockOptionsCtrl.dispo);
    });
  });

  describe('Block de type lien de visualisation', function() {
    var mockLinkAttributes = {};
    beforeEach(inject(function(BlockFactory) {
      mockLinkAttributes = {
        txt:'toto',
        dispo:'left'
      };

      block = createDivider(BlockFactory, 'online');
      block.attributes.link = mockLinkAttributes;
      element = dividerEditor(block);
    }));

    it('doit avoir l\'element block dans le scope', function() {
      expect(controller.block).toEqual(block);
    });

    it('doit avoir deux attributs dans le scope correspondant aux options', function() {
      expect(controller.options.txt).toEqual(mockLinkAttributes.txt);
      expect(controller.options.dispo).toEqual(mockLinkAttributes.dispo);
    });

    it('doit avoir une fonction permettant de modifier les attributs de l\'element du scope', function() {
      var mockOptionsCtrl = {
        txt:'efihzefpizefpi',
        dispo:'center'
      };

      controller.options = mockOptionsCtrl;
      controller.changes();
      expect(controller.block.attributes.link.txt).toEqual(mockOptionsCtrl.txt)
      expect(controller.block.attributes.link.dispo).toEqual(mockOptionsCtrl.dispo);
    });
  })
});