'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:imagePicker
 * @description
 * # imagePicker
 */
angular.module('newsletterEditorApp')
  .directive('imagePicker', function($modal) {
    return {
      templateUrl: 'views/directives/imagePicker.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs: 'vm',
      bindToController: true,
      /**
       * Controller de la directive
       * @param $scope
       */
      controller: function() {
        var self = this;

        if (self.block.attributes) {
          // Assignation de l'image par défaut et du lien.
          self.currentImageUrl = self.block.attributes.url;
          self.linkForImage = self.block.attributes.link;
        }

        /**
         * Ouvre la popup de gestionnaire des fichiers
         */
        self.open = function() {

          $modal.open({
            templateUrl: 'fileManager.html',
            controller: 'ModalFileManagerCtrl',
            resolve: {
              /**
               * Le block courant
               * @returns {*}
               * @constructor
               */
              CurrentBlock: function() {
                return self.block;
              },
              /**
               *
               * @returns {*}
               * @constructor
               */
              CurrentLink: function() {
                return self.linkForImage;
              }
            }
          });
        };

      }
    };
  });
