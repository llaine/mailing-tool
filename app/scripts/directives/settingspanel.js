'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:settingsPanel
 * @description
 * # settingsPanel
 */
angular.module('newsletterEditorApp')
  .directive('settingsPanel', function($rootScope, BlocksManager, EventEmiter, Block, Restangular) {
    return {
      templateUrl: 'views/directives/settingsPanel.html',
      restrict: 'E',
      controller: 'SettingsPanelCtrl'
    };
  });