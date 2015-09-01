'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:imagePicker
 * @description
 * # imagePicker
 */
angular.module('newsletterEditorApp')
  .directive('imagePicker', function($modal, EventEmiter) {
    return {
      templateUrl: '../views/directives/imagePicker.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controller: function ($scope) {
        // Assignation de l'image par défaut et du lien.
        if ($scope.block.type === 'file' && $scope.block.attributes.url) {
          $scope.currentImageUrl = $scope.block.attributes.url;
          $scope.linkForImage = $scope.block.attributes.link;
        }

        /**
         * Ouvre la popup de gestionnaire des fichiers
         */
        $scope.open = function () {

          $modal.open({
            templateUrl: 'fileManager.html',
            controller: 'ModalFileManagerCtrl',
            resolve: {
              CurrentBlock: function() {
                return $scope.block;
              },
              CurrentLink: function () {
                return $scope.linkForImage;
              }
            }
          });
        };

      }
    };
  });
