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
