'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('newsletterEditorApp')
  .directive('textEditor', function($rootScope) {
    var CKEDITOR = window.CKEDITOR || {};
    return {
      template: '<div>' +
                  '<textarea ng-model="block.content" id="editor"></textarea>' +
                '</div>',
      restrict: 'E',
      scope: {
        block:'='
      },
      controller: function($scope) {
        CKEDITOR.replace('editor' );
      },
      link: function(scope, element) {
        CKEDITOR.instances.editor.on('change', function(evt) {
          $rootScope.safeApply(function() {
            scope.block.content = evt.editor.getData();
          });
        })
      }
    };
  });
