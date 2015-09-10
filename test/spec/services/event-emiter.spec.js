'use strict';

describe('Services: EventEmiter', function() {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var eventEmiter;
  var _rootScope;
  beforeEach(inject(function($rootScope, EventEmiter) {
    eventEmiter = EventEmiter;
    _rootScope = $rootScope;
    spyOn($rootScope, '$emit').and.callThrough();
    spyOn($rootScope, '$on').and.callThrough();
  }));

  it('doit avoir une fonction permettant d\'emettre des events pour', function() {
    eventEmiter.emit('test', true);
    expect(_rootScope.$emit).toHaveBeenCalledWith('test', true);
  });

  it('doit avoir une fonction permettant de catcher les events pour', function() {
    eventEmiter.emit('test', true);
    eventEmiter.on('test', function() {

    });

    expect(_rootScope.$on).toHaveBeenCalled();
  });
});