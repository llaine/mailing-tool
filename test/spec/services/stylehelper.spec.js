'use strict';

describe('Service: styleHelper', function() {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var styleHelper;
  beforeEach(inject(function(StyleHelper) {
    styleHelper = StyleHelper;
  }));

  it('doit avoir une fonction pour appliquer le style des block dans le DOM', function() {
    // Applique les styles sur le #emailTemplate
    expect(styleHelper.applyStyleToDom).toBeDefined();
  });

});
