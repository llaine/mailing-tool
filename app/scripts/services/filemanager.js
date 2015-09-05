'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.fileManager
 * @description
 * # fileManager
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('FileManager', function() {
    var img = [];

    if (img.length === 0) {
      // TODO Brancher l'API
      for (var i = 0 ; i < 4 ; ++i) {
        img.push({
          name: i + 'chat',
          id:'image' + i,
          url:'http://localhost:8000/images/chat-' + i + '.jpg'
        });
      }

      img.push({
        name:'toto',
        id:'fezfzef',
        url:'http://lorempixel.com/400/560/sports/'
      });

      img.push({
        name:'émilion',
        id:'fezfzaaaef',
        url:'http://lorempixel.com/1689/560/sports/'
      });

      img.push({
        name:'dasfv',
        id:'fezfdzdzdzef',
        url:'http://lorempixel.com/320/962/sports/'
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
      for(var i = 0; i < img.length ; ++i) {
        if (img[i].id === id) {
          img[i].url = url;
          break;
        }
      }
    }

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
