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
           * Evenement déclenché au moment ou le sorting a été déposé.
           * @param event
           * @param ui
           */
          stop: function(event, ui) {
            // TODO répliquer dans la pile, la position qui a été modifiée.

            var currentRow = ui.item;
            //var src = ui.draggable[0];
            //var target = event.target;
            console.log('testouille');
          }
        });

      }
    };
  }]);
