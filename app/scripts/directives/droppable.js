'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', ['Blocks', function() {
    return {
      restrict: 'A',
      /**
       * Mink
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        element.droppable({
          /**
           * Lorsqu'on élement est droppé sur la grille
           * @param event
           */
          drop: function(event, ui) {
            // TODO répliquer dans la pile, le drop de l'event.
            var src = ui.draggable[0];
            var target = document.elementFromPoint(event.clientX, event.clientY);

            /* pour éviter que  */
            if (src.tagName === 'LI' && (target.tagName === 'SPAN' || target.tagName === 'TD')) {
              $(target).text(src.innerText);
            }

          },
          /**
           * Evenement déclenché au over sur le droppable.
           * @param event
           * @param ui
           */
          over: function(event, ui) {
            console.log('over');
          }
        });
      }
    };
  }]);
