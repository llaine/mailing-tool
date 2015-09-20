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
                  '<textarea ng-model="block.content""></textarea>' +
                '</div>',
      restrict: 'E',
      scope: {
        block:'='
      },
      link: {
        post:function(scope, element) {
          // Génération à la volée de l'id de l'éditeur, pour éviter la duplication
          // lors des block de type double.
          var generatedId = 'editor_' + Math.random().toString(36).slice(2);
          element.children().find('textarea').attr('id', generatedId);
          CKEDITOR.replace(generatedId);
          CKEDITOR.instances[generatedId].on('change', function(evt) {
            $rootScope.safeApply(function() {
              scope.block.content = evt.editor.getData();
            });
          });
        }
      },
      controller: function($scope, $element) {

      }
    };
  });
