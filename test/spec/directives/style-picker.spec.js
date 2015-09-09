'use strict';

describe('Directive: stylePicker', function() {
  var element;
  var scope;
  var compile;
  var block;
  var controller;
  var styleHelper;
  var currentRow;

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  /**
   * Crée la directive
   * @param block
   * @returns {*}
   */
  function createDirective(block) {
    var dir;
    if (block) {
      scope.block = block;
      dir = angular.element('<style-picker block="block"></style-picker>');
    } else {
      dir = angular.element('<style-picker></style-picker>');
    }
    dir = compile(dir)(scope);
    scope.$apply();
    controller = dir.controller('stylePicker');
    return dir;
  }

  beforeEach(inject(function($rootScope, $compile, BlockFactory, StyleHelper, EventEmiter) {
    scope = $rootScope.$new();
    compile = $compile;
    styleHelper = StyleHelper;

    // On ajout un h1 et un p dans le block.
    var b = mockBlockModels(BlockFactory, false)[0];
    b.content = '<h1>fezfze</h1><p>fezfiphzefpi</p>';
    block = b;

    element = createDirective(block);

    spyOn(styleHelper, 'applyStyleToDom').and.callThrough();
  }));

  it('doit contenir des paramètrs par défaut', function() {
    expect(controller.params).toBeDefined();
  });

  it('doit contenir des fonts, taille titres, etc', function() {
    expect(controller.fonts).toBeDefined();
    expect(controller.sizeTitle).toBeDefined();
    expect(controller.size).toBeDefined();
    expect(controller.layoutDouble).toBeDefined();
  });

  describe('Lorsqu\'on à sélectionné un block', function() {
    beforeEach(function() {
      // Mock la currentRownEdited.
      currentRow = document.createElement('tr');
      currentRow.innerHTML = '<tr>' + block.toString() + '</td>';
      controller.currentRowEdited = currentRow;
    });

    it('doit contenir un block dans le scope', function() {
      expect(controller.block).toEqual(block);
    });

    describe('un block de type simple', function() {
      it('doit pouvoir changer les titres du block courant', function() {
        controller.params.title = mockTitlesStylePicker;
        controller.changeTitle();

        expect(styleHelper.applyStyleToDom).toHaveBeenCalled();
        expect(controller.block.contentStyle.h1).toEqual(mockTitlesStylePicker);
      });
    });
  });

  describe('Lorsqu\'on a pas sélectionné de block', function() {

  });




});