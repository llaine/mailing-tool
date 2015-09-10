'use strict';

describe('Service: BlocksManager', function () {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var BlocksManager;
  beforeEach(inject(function(_BlocksManager_, $httpBackend) {
    BlocksManager = _BlocksManager_;
    $httpBackend
        .whenGET('http://api.preprod.bobelweb.eu/template')
        .respond(200, []);
  }));

  it('doit contenir une fonction permettant de récupérer un élement de la pile', function() {
    expect(BlocksManager.get(0)).toBeTruthy();
  });

  it('doit contenir une fonction permettant de récupérere toute la pile', function() {
    expect(BlocksManager.getAll().length).toBeGreaterThan(0);
  });

  it('doit contenir une fonction permettant de mettre à jour un élement de la pile', function() {
    var newBlock = {foo:'var'};
    BlocksManager.updateContent(0, newBlock);
    expect(BlocksManager.get(0)).toEqual(newBlock);
  });

  it('doit contenir une fonction permettant de remplacer la stack', function() {
    var newStack = [];
    BlocksManager.setModel(newStack);
    expect(BlocksManager.getAll()).toEqual(newStack);
  });

  it('doit contenir une fonction permettant de récupérer les icones pour chaque type de block', function() {
    expect(BlocksManager.getIconsForType('text')).toEqual(['align-justify']);
    expect(BlocksManager.getIconsForType('file')).toEqual(['picture']);
    expect(BlocksManager.getIconsForType('divider')).toEqual(['minus']);
    expect(BlocksManager.getIconsForType('unsub')).toEqual(['remove-circle']);
    expect(BlocksManager.getIconsForType('text-file')).toEqual(['align-justify', 'picture']);
    expect(BlocksManager.getIconsForType('file-text')).toEqual(['picture', 'align-justify']);
    expect(BlocksManager.getIconsForType('text-text')).toEqual(['align-justify', 'align-justify']);
    expect(BlocksManager.getIconsForType('file-file')).toEqual(['picture', 'picture']);
    // Dans tout les autres cas.
    expect(BlocksManager.getIconsForType('')).toEqual(['question-sign']);
  });
});
