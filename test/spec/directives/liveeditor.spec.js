'use strict';

describe('Directive: liveEditor', function() {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  var element;
  var scope;
  var blocks;
  var controller;
  var event;
  var eventEmiter;
  var modal;

  beforeEach(inject(function($rootScope, $compile, BlockFactory, EventEmiter, $modal) {
    scope = $rootScope.$new();
    modal = $modal;

    blocks = mockBlockModels(BlockFactory, true);
    eventEmiter = EventEmiter;

    // Création de la directive;
    element = angular.element('<live-editor></live-editor>');
    element = $compile(element)(scope);

    scope.$apply();

    controller = element.controller('liveEditor');

    // Spy sur différentes function qui vont être appelés.
    event = {
      stopPropagation: jasmine.createSpy('event.stopPropagation')
    };

    spyOn(EventEmiter, 'emit').and.callThrough();
    spyOn($modal, 'open').and.returnValue(mockModal);
  }));

  it('Doit contenir un tableau de blocks', function() {
    expect(scope.blocks).toBeDefined();
  });

  it('doit avoir des options pour le sortable', function() {
    expect(scope.sortableOptions.handle).toEqual('a.handleDrag');
  });

  it('doit avoir une fonction permettant dupliquer un block', function() {
    var blockToDuplicate = blocks[2];
    controller.duplicate(event, blockToDuplicate);

    expect(event.stopPropagation).toHaveBeenCalled();
    // TODO Fix
    //expect(scope.blocks[3]).toEqual(blockToDuplicate);
  });

  it('doit avoir une fonction permettant d\'ouvrir le settingsPanel pour modifier le block', function() {
    var blockToUpdate = blocks[0];
    var tr = angular.element(document.createElement('tr'));
    controller.update(event, blockToUpdate);

    expect(eventEmiter.emit).toHaveBeenCalled();
  });

  it('doit avoir une fonction permettant de supprimer un block', function() {
    var length = blocks.length;
    var blockToBeDeleted = blocks[2];
    controller.delete(event, blockToBeDeleted);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.blocks.length).toBe(length - 1);
    expect(scope.blocks.indexOf(blockToBeDeleted)).toBe(-1);
  });

  it('doit avoir une fonction permettant de prévisualiser l\'ensemble des blocks', function() {
    controller.preview();
    expect(modal.open).toHaveBeenCalled();
  });
});
