'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:sortable
 * @description
 * # sortable
 */
angular.module('newsletterEditorApp')
  .directive('sortable',  ['Blocks', function() {
    return {
      restrict: 'A',
      /**
       * fe
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {

        /* la directive transforme l'élement en sortable.  */
        element.sortable({
          /**
           * Petite fonction de helper pour que toute
           * la ligne de la table soit sélectionnée.
           * @param e
           * @param ui
           * @returns {*}
           */
          helper: function(e, ui) {
            ui.children().each(function() {
              $(this).width($(this).width());
            });
            return ui;
          },
          placeholder:'active',
          /**
           * Evenement déclenché au moment ou le sorting a été déposé.
           * @param event
           * @param ui
           */
          stop: function(event, ui) {
            // TODO répliquer dans la pile, la position qui a été modifiée.

            //var src = ui.draggable[0];
            //var target = event.target;
            console.log('testouille');
          }
        });

      }
    };
  }]);
