'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:settingsPanel
 * @description
 * # settingsPanel
 */
angular.module('newsletterEditorApp')
  .directive('settingsPanel', ['Blocks', function(Blocks) {
    return {
      templateUrl: '../views/directives/settingsPanel.html',
      restrict: 'E',
      /**
       * Fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        /**
         * Ajoute un item à l'éditeur live, et en fonction du type
         * lance une action.
         * @param type
         */
        scope.toggleToEditor = function(type) {

          switch (type) {
            case 'text':
              // TODO CkEditor
              break;
            case 'file':
              // TODO Aviary
              break;
            default:

              break;
          }

          Blocks.append(type);
        };
      },
      /**
       * Ctrl
       * @param $scope
       * @param $element
       */
      controller: function($scope, $element) {
        $scope.availableBlock = [
          {type:'file', text:'Image'},
          {type:'text', text:'Texte'}
        ];
      }
    };
  }]);
