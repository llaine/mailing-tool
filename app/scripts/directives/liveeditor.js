'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:liveEditor
 * @description
 * # liveEditor
 */
angular.module('newsletterEditorApp')
  .directive('liveEditor', ['Blocks', function(Blocks) {
    return {
      templateUrl: '../views/directives/liveEditor.html',
      restrict: 'E',
      /**
       * Fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        scope.blocks = Blocks.getAll();

        /**
         * Ouvre le mode "édition" d'un block.
         * On peut modifier ce qui e st à l'intérieur du block.
         * @param el
         */
        scope.editBlock = function(el) {

        };

        /**
         * Bouge le block d'une direction vers une autre.
         * @param el
         * @param direction
         */
        scope.moveBlock = function(el, direction) {


        };
      }
    };
  }]);
