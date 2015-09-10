'use strict';

describe('Directive: stylePicker', function() {
  var element;
  var scope;
  var compile;
  var block;
  var controller;
  var styleHelper;
  var currentRow;
  var draggableHelper;

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

  beforeEach(inject(function($rootScope, $compile, BlockFactory, StyleHelper, DraggableHelper) {
    scope = $rootScope.$new();
    compile = $compile;
    styleHelper = StyleHelper;
    draggableHelper = DraggableHelper;

    // On ajout un h1 et un p dans le block.
    var b = mockBlockModels(BlockFactory, false)[0];
    b.content = '<h1>fezfze</h1><p>fezfiphzefpi</p><img src="toto.png"/> ';
    block = b;

    element = createDirective(block);

    spyOn(styleHelper, 'applyStyleToDom').and.callThrough();
    // Mock la fonction getPositionOfElement
    spyOn(draggableHelper, 'getPositionOfElement').and.callFake(function() {
      return {
        top:10,
        left:10
      }
    });
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
        controller.params.title = mockParamsTitles;
        controller.changeTitle();

        expect(styleHelper.applyStyleToDom).toHaveBeenCalled();
        expect(controller.block.contentStyle.h1).toEqual(mockTitlesStylePicker);
      });

      it('doit pouvoir changer le style du background', function() {
        controller.params.background = mockBackgroundStylePicker;
        controller.changeBackground();

        expect(styleHelper.applyStyleToDom).toHaveBeenCalled();
        expect(controller.block.contentStyle.tr).toEqual(mockParamsBackground);
      });

      it('doit pouvoir changer les styles des paragraph', function() {
        controller.params.paragraph = mockParagraphStylePicker;
        controller.changeParagraph();

        expect(styleHelper.applyStyleToDom).toHaveBeenCalled();
        expect(controller.block.contentStyle.p).toEqual(mockParamsParagraph);
      });

      it('doit pouvoir changer les marges sur une image', function() {
        controller.onImgPosChanged(document.createElement('span'));

        expect(draggableHelper.getPositionOfElement).toHaveBeenCalled();
        expect(styleHelper.applyStyleToDom).toHaveBeenCalled();
        expect(controller.block.contentStyle.img).toEqual(mockParamsImg);
      });

    });
  });
});