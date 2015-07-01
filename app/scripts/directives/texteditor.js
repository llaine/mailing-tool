'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('newsletterEditorApp')
  .directive('textEditor', ['CurrentObject', function(CurrentObject) {
    var CKEDITOR = window.CKEDITOR || {};

    return {
      template: '<textarea id="editor" rows="10" cols="30">{{ text }}</textarea>' +
                '<button class="btn btn-success btn-sm" type="submit">Enregistrer</button>' +
                '<button class="btn btn-warning btn-sm" type="reset">Quitter</button>',
      restrict: 'E',
      scope: {
        text:'='
      },
      /**
       * Affiche l'éditeur.
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        scope.text = 'Entrez le texte ici';
        CKEDITOR.replace('editor');

        element.find('button.btn-success').on('click', function() {
          /* modification du modèle dans l'objet */
          var text = CurrentObject.get('text');
          text.content.html = CKEDITOR.instances.editor.getData();
          CurrentObject.set('text', text);

          scope.$emit('blockTxtSaved', true);
          scope.$emit('blockTxtDestroyed', true);

          scope.$apply(function() {
            scope.text = 'Entrez le texte ici';
          });

        });

        element.find('button.btn-warning').on('click', function() {
          scope.$emit('blockTxtDestroyed', true);
          CurrentObject.destroy('text');
        });
      }
    };
  }]);
