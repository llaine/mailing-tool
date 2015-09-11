'use strict';

describe('Controller: ModalFileManagerCtrl', function() {

  var ModalFileManagerCtrl;
  var currentBlock;
  var modalInstance;
  var $scope;
  var CurrentLink;

  // load the controller's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  beforeEach(inject(function($rootScope, $controller, AviaryEditor, FileManager, BlockFactory) {
    modalInstance = $modalInstance;
    var bf = new BlockFactory();
    currentBlock = bf.create({type:'file'});
    currentBlock.attributes.link = 'http://google.com';
    $scope = $rootScope.$new();

    ModalFileManagerCtrl = $controller('ModalFileManagerCtrl', {
      $scope: $scope,
      $modalInstance: modalInstance,
      CurrentBlock: currentBlock,
      AviaryEditor:AviaryMock,
      FileManager:FileManager
    });
  }));

  describe('Au lancement de la modal', function() {
    it('Le controller doit bien être instancé', function() {
      expect(ModalFileManagerCtrl).not.toBeUndefined();
    });

    it('doit avoir un tableau d\'images', function() {
      expect($scope.images).not.toBeUndefined();
    });

    it('doit avoir une fonction modify, qui lance l\'editeur Aviary', function() {
      $scope.modify();
      expect(AviaryMock.launchEditor).toHaveBeenCalled();
    });

    it('doit avoir une fonction select qui permet de sélectionner une image sur et de l\'assigner sur l\'editeur',
        function() {
          var image = FileManagerMock[0];

          $scope.select(image);

          expect(currentBlock.attributes).not.toBeUndefined();
          expect(currentBlock.attributes.id).not.toBeUndefined();
          expect(currentBlock.attributes.link).toEqual('http://google.com');
          expect(currentBlock.attributes.url).toEqual(image.url);
        }
    );

    it('doit avoir une fonction pour fermer la modal', function() {
      $scope.close();
      expect(modalInstance.close).toHaveBeenCalled();
    });

    it('doit avoir une fonction pour sélectionner l\'ordre de tri des images', function() {
      $scope.setOrder('ASC');
      expect($scope.order).toEqual('ASC');
    });
  });
});