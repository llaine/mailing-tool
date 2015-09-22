'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.fileManager
 * @description
 * # fileManager
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('FileManager', function(Restangular) {
    var img = [];

    if (img.length === 0) {
      // TODO Remplacer par upload vignettes. 
      loadImages();
    }

    /**
     * Load les images
     */
    function loadImages() {
      Restangular.all('image').getList().then(function(data) {
        img = data;
      });
    }

    /**
     * Renvoie toutes les images
     * @returns {Array}
     */
    function getAll() {
      return img;
    }

    /**
     * Mets à jours le lien d'une image
     * (principalement parce qu'elle a été modifié avec Aviary
     * @param id
     * @param url
     */
    function updateImage(id, url) {
      // TODO, en plus de l'update dans le tableau,
      // faire POST sur l'API pour uploader la nouvelle image
      for (var j = 0; j < img.length ; ++j) {
        if (img[j].id === id) {
          img[j].url = url;
          break;
        }
      }
    }

    /**
     *
     * @returns {*[]}
     */
    function getSocialImages() {
      return [
        {name:'facebook', img: '<img src="images/social_icons/32/02_facebook.png"/>', link:''},
        {name:'twitter', img: '<img src="images/social_icons/32/01_twitter.png"/>', link:''},
        {name:'linkedin', img: '<img src="images/social_icons/32/07_linkedin.png"/>', link:''},
        {name:'youtube', img: '<img src="images/social_icons/32/03_youtube.png"/>', link:''},
        {name:'vimeo', img: '<img src="images/social_icons/32/09_vimeo.png"/>', link:''}
      ];
    }

    return {
      getAll:getAll,
      updateImage:updateImage,
      getSocialImages:getSocialImages
    };

  });
