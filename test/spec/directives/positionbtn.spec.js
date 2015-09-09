'use strict';

describe('Directive: positionBtn', function() {
  var element;
  var scope;
  var compile;
  var block;
  /**
   * Function de mock des changements
   */
  var fn = function() {
    // return ...
  };

  // load the directive's module
  beforeEach(module('newsletterEditorApp'));
  beforeEach(module('directivesTemplates'));

  /**
   * Créer la directive.
   * @param fn
   * @returns {*}
   */
  function createDirective(fn) {
    scope.onChange = fn;
    var directive = angular.element('<position-btn on-change="onChange"></position-btn>')
    directive = compile(directive)(scope);
    scope.$apply();
    return directive;
  }

  beforeEach(inject(function($rootScope, $compile) {
    compile = $compile;
    scope = $rootScope.$new();
    element = createDirective(fn);
  }));

  it('doit avoir une fonction dans le scope', function() {
    expect(scope.onChange).toEqual(fn);
  });
});
