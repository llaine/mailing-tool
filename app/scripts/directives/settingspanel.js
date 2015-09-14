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
      controllerAs:'spCtrl',
      bindToController:true,
      link: function(scope, element, attrs) {
        element.find('.btn-group > .btn').click(function(e) {
          e.preventDefault();
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
          $(this).tab('show');
        });
      }
    };
  });