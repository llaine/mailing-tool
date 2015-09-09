'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('newsletterEditorApp')
  .directive('textEditor', function() {
    return {
      template: '<div ng-model="block.content" ckeditor="options"></div>',
      restrict: 'E',
      scope: {
        block:'='
      },
      /**
       * Affiche l'éditeur.
       * @param $scope
       */
      controller: function($scope) {
        $scope.options = {
          language: 'fr',
          allowedContent: true,
          entities: false
        };
      }
    };
  });
