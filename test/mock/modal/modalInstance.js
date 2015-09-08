var $modalInstance = {
  close: jasmine.createSpy('modalInstance.close'),
  dismiss: jasmine.createSpy('modalInstance.dismiss'),
  result: {
    then: jasmine.createSpy('modalInstance.result.then')
  },
  open: jasmine.createSpy('modalInstance.open')
};