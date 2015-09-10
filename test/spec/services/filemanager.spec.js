'use strict';

describe('Service: fileManager', function() {

  // load the service's module
  beforeEach(module('newsletterEditorApp'));

  // instantiate service
  var fileManager;
  beforeEach(inject(function(FileManager) {
    fileManager = FileManager;
  }));

  it('doit avoir une fonction pour récupérer toute les photos', function() {
    expect(fileManager.getAll().length).toBeGreaterThan(0);
  });

  it('doit avoir une fonction pour mettre à jour une image', function() {
    var pic = fileManager.getAll()[0];
    var mockLink = 'http://toto.com';
    fileManager.updateImage(pic.id, mockLink);
    expect(fileManager.getAll()[0].url).toEqual(mockLink);
  });

  it('doit avoir une fonction permettant de récupérer les social medias photos', function() {
    var mockSocial = [
      {name:'facebook', img: '<img src="images/social_icons/32/02_facebook.png"/>', link:''},
      {name:'twitter', img: '<img src="images/social_icons/32/01_twitter.png"/>', link:''},
      {name:'linkedin', img: '<img src="images/social_icons/32/07_linkedin.png"/>', link:''},
      {name:'youtube', img: '<img src="images/social_icons/32/03_youtube.png"/>', link:''},
      {name:'vimeo', img: '<img src="images/social_icons/32/09_vimeo.png"/>', link:''}
    ];

    expect(fileManager.getSocialImages()).toEqual(mockSocial)
  });

});
