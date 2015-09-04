'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:dividerEditor
 * @description
 * # dividerEditor
 */
angular.module('newsletterEditorApp')
  .directive('dividerEditor', function() {
    return {
      templateUrl: 'views/directives/divider-editor.html',
      restrict: 'E',
      scope: {
        'block': '='
      },
      /**
       * Controller de la directive.
       */
      controller: function() {
        this.taille = ['2px', '5px', '7px', '13px', '15px', '18px', '20px', '24px'];
        this.bords = ['5px', '10px', '15px', '20px', '25px'];
      },
      controllerAs: 'dividerCtrl',
      bindToController: true
    };
  });