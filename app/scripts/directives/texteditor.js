'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('newsletterEditorApp')
  .directive('textEditor', function(CurrentObject) {
    var CKEDITOR = window.CKEDITOR || {};

    return {
      template: '<textarea id="editor" rows="10" cols="30">{{ text }}</textarea>' +
                '<button class="btn btn-success btn-sm" ng-click="submit(text)" type="submit">Enregistrer</button>' +
                '<button class="btn btn-warning btn-sm" ng-click="reset()" type="reset">Quitter</button>',
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

        /**
         * Fonction appelé au moment ou l'on valide le texte dans l'éditeur.
         * @param txt
         */
        scope.submit = function(txt) {
          /* modification du modèle dans l'objet */
          var modifiedObject = CurrentObject.get('text');
          var htmlFromEditor = CKEDITOR.instances.editor.getData();

          modifiedObject.content.html = htmlFromEditor;

          CurrentObject.set('text', modifiedObject);

          scope.$emit('blockTxtSaved', true);
        };

        /**
         * Fonction qui est appelé lorsque l'utilisateur quitte l'éditeur de texte.
         */
        scope.reset = function() {
          scope.$emit('blockTxtDestroyed', true);
          CurrentObject.destroy('text');
        };
      }
    };
  });
