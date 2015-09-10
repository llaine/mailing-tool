'use strict';

describe('Controller: ModalPreviewCtrl', function() {

  var ModalPreviewCtrl;
  var scope;
  var modalInstance;

  // load the controller's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  describe('Lorsque la modal se lance à la génération de block simple', function() {

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, DomManipulator, $rootScope, BlockFactory) {
      scope = $rootScope.$new();
      modalInstance = $modalInstance;

      ModalPreviewCtrl = $controller('ModalPreviewCtrl', {
        $scope:scope,
        $modalInstance: modalInstance,
        BlocksModel: mockBlockModels(BlockFactory, false),
        backgroundColor: '#ffffff',
        borderType:'1px solid white',
        DomManipulator:DomManipulator
      });
    }));

    it('le controller doit bien s\'instancier', function() {
      expect(ModalPreviewCtrl).not.toBeUndefined();
    });

    it('dispose d\'une fonctione permettant de fermer la modal', function() {
      scope.exit();
      expect(modalInstance.close).toHaveBeenCalled();
    });

    it('dispose d\'un style par défaut', function() {
      expect(scope.style).toEqual(whiteStyle);
    });

    it('génère automatiquement le HTML de l\'editeur live', function() {
      expect(scope.preview).toEqual(blockPreviewFromModalWithoutDouble);
    });
  });

  describe('Lorsque la modal se lance à la génération de block double', function() {
    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, DomManipulator, $rootScope, BlockFactory) {
      scope = $rootScope.$new();
      modalInstance = $modalInstance;

      ModalPreviewCtrl = $controller('ModalPreviewCtrl', {
        $scope:scope,
        $modalInstance: modalInstance,
        BlocksModel: mockBlockModels(BlockFactory, true),
        backgroundColor: '#000000',
        borderType:'1px solid black',
        DomManipulator:DomManipulator
      });
    }));

    it('le controller doit bien s\'instancier', function() {
      expect(ModalPreviewCtrl).not.toBeUndefined();
    });

    it('dispose d\'une fonctione permettant de fermer la modal', function() {
      scope.exit();
      expect(modalInstance.close).toHaveBeenCalled();
    });

    it('dispose d\'un style par défaut', function() {
      expect(scope.style).toEqual(blackStyle);
    });

    /*
    it('génère automatiquement le HTML de l\'editeur live', function() {
      expect(scope.preview).toEqual(blockPreviewFromModalWithDouble);
    });
    */
  });
});
