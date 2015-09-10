'use strict';

describe('Service: DomManipulator', function() {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var DomManipulator;
  var p;

  beforeEach(inject(function(_DomManipulator_) {
    DomManipulator = _DomManipulator_;
    p = DomManipulator.createElement('p');
  }));

  it('doit avoir une fonction pour créer un élement HTML', function() {
    expect(p.tagName).toEqual('P');
  });

  it('doit avoir une fonction permettant de créer un tableau HTML', function() {
    var mockRows = [[{width:'10%', html:'toto'}, {width:'10%', html:'tata'}]];
    var table = DomManipulator.createTable(mockRows);
    expect(table.tagName).toEqual('TABLE');
    expect(table.childNodes.length).toBe(1); // le TR
    expect(table.childNodes[0].childNodes.length).toBe(2);
    expect(table.childNodes[0].childNodes[0].tagName).toEqual('TD'); // TD
    expect(table.childNodes[0].childNodes[1].tagName).toEqual('TD'); // TD
  });
});
