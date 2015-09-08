'use strict';

describe('Directive: droppable', function() {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('doit contenir la classe droppable, appartenant aux élements droppable.', inject(function($compile) {
    element = angular.element('<div droppable></div>');
    element = $compile(element)(scope);
    scope.$apply();

    /* on test que la class draggable soit bien activé aka ce qui signifie que
     * jQuery UI a bien considéré notre DOM element comme draggable. */
    expect(element[0].className.includes('ui-droppable')).toBeTruthy();
  }));
});
