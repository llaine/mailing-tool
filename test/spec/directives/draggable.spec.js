'use strict';

describe('Directive: draggable', function() {

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('doit contenir une class appartenant aux élement draggable. ', inject(function($compile) {
    element = angular.element('<div draggable></div>');
    element = $compile(element)(scope);
    scope.$apply();

    /* on test que la class draggable soit bien activé aka ce qui signifie que
     * jQuery UI a bien considéré notre DOM element comme draggable. */
    // Ce test ne fonctionne pas avec PhantomJS qui est headless (donc ne peut pas tester le DOM).
    // Nécessaire d'utilier Chrome pour tester.
    expect(element[0].className.includes('ui-draggable')).toBeTruthy();
  }));
});
