'use strict';

describe('Controller: TemplatesCtrl', function() {

  // load the controller's module
  beforeEach(module('newsletterEditorApp'));

  var TemplatesCtrl,
      scope,
      location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $location, $rootScope) {
    scope = $rootScope.$new();
    location = $location;
    TemplatesCtrl = $controller('TemplatesCtrl', {
      $location:$location,
      availableTemplates:availablesTemplates
    });
  }));

  it('doit avoir une fonction permettant de sélectionner le template courant', function() {
    TemplatesCtrl.select(availablesTemplates[0]);
    expect(TemplatesCtrl.selected).toBe(availablesTemplates[0]);
  });

  it('doit avoir une fonction permettant de changer de location', function() {
    var tpl = availablesTemplates[0];
    TemplatesCtrl.select(tpl);
    });

});
