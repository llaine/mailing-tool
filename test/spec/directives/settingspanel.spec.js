'use strict';

describe('Directive: settingsPanel', function() {
  var element;
  var scope;
  var compile;
  var blocks;
  var controller;
  var httpBackend;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  beforeEach(inject(function($rootScope, $httpBackend, BlockFactory) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    blocks = mockBlockModels(BlockFactory, false);
  }));

  it('doit afficher la liste des élements', inject(function($compile) {
    httpBackend
        .whenGET('http://api.preprod.bobelweb.eu/block-type')
        .respond(200, blocks);

    httpBackend
        .whenGET('http://api.preprod.bobelweb.eu/image')
        .respond(200, []);
    element = angular.element('<settings-panel></settings-panel>');
    element = $compile(element)(scope);
    scope.$apply();

    // TODO, refacto avec un defer de la promise.
    setTimeout(function() {
      expect(scope.availableBlocks).toEqual(blocks);
    }, 4000);
  }));
});
