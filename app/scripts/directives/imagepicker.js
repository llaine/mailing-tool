'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:imagePicker
 * @description
 * # imagePicker
 */
angular.module('newsletterEditorApp')
  .directive('imagePicker', function($modal, AviaryEditor, EventEmiter) {
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
      controller: function() {
        var self = this;

        EventEmiter.on('file:changed', function(evt, opts) {
          self.block.attributes.url = opts.url;
          self.updateLink(true);
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
          var img = '<img id="' + self.block.attributes.id + '" src="' +
              self.block.attributes.url + '" class="img-rounded"/>';

          if (updateImg && !self.block.attributes.link) {
            self.block.content = img;
          } else if (self.block.attributes.link) {
            self.block.content =  '<a target="_blank" href="' +
                encodeURI(self.block.attributes.link) + '">' +
                img + '</a>';
          }
        };

        /**
         *
         * @param image
         */
        self.modify = function(image) {
          AviaryEditor.launchEditor(image);
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
