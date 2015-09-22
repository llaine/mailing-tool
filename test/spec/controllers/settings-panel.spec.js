'use strict';

describe('Controller: SettingsPanelCtrl', function(){
  var SettingsPanelCtrl;
  var $scope;
  var eventEmiter;
  var rootScope;
  var httpBackend;

  // load the controller's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  beforeEach(inject(function($controller, $rootScope, EventEmiter, BlockFactory, $httpBackend) {
    rootScope = $rootScope;
    $scope = $rootScope.$new();
    $scope.blocks = mockBlockModels(BlockFactory, false);
    eventEmiter = EventEmiter;
    httpBackend = $httpBackend;

    SettingsPanelCtrl = $controller('SettingsPanelCtrl', {
      $rootScope:$rootScope,
      $scope:$scope,
      EventEmiter:EventEmiter,
      BlockFactory:BlockFactory
    });

    spyOn(EventEmiter, 'emit').and.callThrough();
    spyOn(EventEmiter, 'on').and.callThrough();

    httpBackend
        .whenGET('http://api.preprod.bobelweb.eu/image')
        .respond(200, []);
  }));

  describe('lorsque le settingsPanel se lance', function() {
    it('ne doit pas être en mode edition', function() {
      expect($scope.modeEdition).toBeFalsy();
    });

    it('$scope.saveAndClose, doit fermer l\'editeur et thrower un event', function() {
      SettingsPanelCtrl.saveAndClose();
      expect($scope.modeEdition).toBeFalsy();
      expect(eventEmiter.emit).toHaveBeenCalledWith('panel:closed', true);
    });

    it('$scope.addBlock, doit ajouter un block sur l\'editeur ', function() {
      var previousLength = $scope.blocks.length;
      SettingsPanelCtrl.addBlock();
      expect($scope.blocks.length).toEqual(previousLength + 1);
    });
  });

  describe('doit afficher le block à modifier, lorsqu\'on clique sur modifier', function() {
    beforeEach(function() {
      var mockNewBlock = {
        tr: angular.element(document.createElement('tr')),
        block: $scope.blocks[0]
      };

      // Va chercher les types de block.
      httpBackend
          .whenGET('http://api.preprod.bobelweb.eu/block-type')
          .respond(200, []);

      eventEmiter.emit('edition:toggled', mockNewBlock);
    });

    it('doit afficher l\'éditeur avec le block correspondant', function() {
      expect($scope.modeEdition).toBeTruthy();
      expect(SettingsPanelCtrl.currentBlock).toEqual($scope.blocks[0]);
    });
  });
});