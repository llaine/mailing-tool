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
      template: '<textarea name="editor1" id="editor1" rows="10" cols="30"></textarea>',
      restrict: 'E',
      /**
       * Affiche l'éditeur.
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        CKEDITOR.replace('editor1');
      }
    };
  });
