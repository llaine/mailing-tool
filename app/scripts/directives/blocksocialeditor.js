'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:blockSocialEditor
 * @description
 * # blockSocialEditor
 */
angular.module('newsletterEditorApp')
  .directive('blockSocialEditor', function(FileManager) {
    return {
      templateUrl: 'views/directives/block-social-editor.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs:'seCtrl', //socialEditorCtrl
      bindToController:true,
      /**
       * Le controller de la directive
       */
      controller: function() {
        this.socialImages = FileManager.getSocialImages();

        /**
         * Mets à jour les block sur l'éditeur
         * en fonction de si les link sociaux on un lien ou pas.
         */
        this.updateSocialNetworkOnBlock = function() {
          // Je récupère l'img des blocks qui ont un lien
          this.block.content = this.socialImages
            .filter(function(social) {
              return social.link;
            })
            .map(function(social) {
              return social.img;
            })
            .join('');
        };
      }
    };
  });
