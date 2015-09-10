'use strict';

describe('Filter: sanitize', function() {

  // load the filter's module
  beforeEach(module('newsletterEditorApp'));

  // initialize a new instance of the filter before each test
  var sanitize;
  beforeEach(inject(function($filter) {
    sanitize = $filter('sanitize');
  }));

  it('doit retourner du HTML parsé. ', function() {
    var result = sanitize('<p>Contenu</p>');
    expect(result.$$unwrapTrustedValue()).toEqual('<p>Contenu</p>')
  });

});
