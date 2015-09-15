'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:imagePicker
 * @description
 * # imagePicker
 */
angular.module('newsletterEditorApp')
  .directive('imagePicker', function($modal, AviaryEditor, EventEmiter, DomManipulator) {
    return {
      templateUrl: 'views/directives/imagePicker.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs: 'imgPickCtrl',
      bindToController: true,
      /**
       * Controller de la directive
       * @param $scope
       */
      controller: function($scope) {
        var self = this;

        EventEmiter.onEvent($scope, 'file:changed', function(evt, opts) {
          if (opts.position === self.block.position) {
            self.block.attributes.url = opts.url;
            self.updateLink(true, opts.position);
          }
        });

        if (self.block.attributes) {
          // Assignation de l'image par défaut et du lien.
          self.currentImageUrl = self.block.attributes.url;
          self.linkForImage = self.block.attributes.link;
        }

        /**
         * Mets à jour le lien sur l'image.
         */
        self.updateLink = function(updateImg) {
          var img = DomManipulator.createStringImg(self.block.attributes.id, self.block.attributes.url);

          if (updateImg && !self.block.attributes.link) {
            self.block.content = img;
          } else if (self.block.attributes.link) {
            self.block.content = DomManipulator.createStringLink(self.block.attributes.link, img);
          }
        };

        /**
         * Modifie l'image situé à la position dans la ligne.
         * @param image
         * @param fromPosition
         */
        self.modify = function(image, fromPosition) {
          AviaryEditor.launchEditor(image, fromPosition);
        };

        /**
         * Ouvre la popup d'upload de fichier
         */
        self.openUploader = function() {
          $modal.open({
            templateUrl:'uploadImage.html',
            controller:'UploadImageCtrl'
          });
        };

        /**
         * Ouvre la popup de gestionnaire de fichier.
         */
        self.openImageManager = function() {
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
              }
            }
          });
        };
      }
    };
  });
