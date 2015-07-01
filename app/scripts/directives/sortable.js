'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:sortable
 * @description
 * # sortable
 */
angular.module('newsletterEditorApp')
  .directive('sortable',  ['BlocksManipulator', function(BlocksManipulator) {
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
          placeholder:'active',
          /**
           *
           */
          start: function(event, ui) {
            var cell = ui.item[0].children[0];
            ui.item.startPos = ui.item.index() + 1;

            $(cell).attr('data-position-start', ui.item.startPos);
          },
          /**
           * Evenement déclenché au moment ou le sorting a été déposé.
           * @param event
           * @param ui
           */
          stop: function(event, ui) {
            // TODO répliquer dans la pile, la position qui a été modifiée.

            var cell = ui.item[0].children[0];
            var newPosition = ui.item.index() + 1; // Nous donne la position dans la liste
            var oldCell = $('#body').children().eq(ui.item.startPos - 1)[0].children[0];

            BlocksManipulator.changeBlockPos(ui.item.startPos, newPosition);

            console.log(cell);
            console.log(oldCell);
          }
        });

      }
    };
  }]);
