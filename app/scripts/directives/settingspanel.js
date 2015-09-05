'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:settingsPanel
 * @description
 * # settingsPanel
 */
angular.module('newsletterEditorApp')
  .directive('settingsPanel', function() {
    return {
      templateUrl: 'views/directives/settingsPanel.html',
      restrict: 'E',
      controller: 'SettingsPanelCtrl',
      controllerAs:'vm',
      bindToController:true
    };
  });