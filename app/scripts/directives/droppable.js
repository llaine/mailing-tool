'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', ['BlocksManipulator', 'CurrentObject', function(BlocksManipulator, CurrentObject) {
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
           * Evenement lorsqu'on élement est droppé sur la grille
           * @param event
           * @param ui
           */
          drop: function(event, ui) {
            var src = ui.draggable[0];
            var target = document.elementFromPoint(event.clientX, event.clientY);

            /* Seul les élements de type Li peuvent être droppé sur une span ou un td  */
            if (src.tagName === 'LI' && (target.tagName === 'SPAN' || target.tagName === 'TD')) {

              // TODO Montrer qu'on est en train de mettre à jour le modèle.

              /* On ajoute un block dans le pile des blocks */
              var blockCreated = BlocksManipulator.createBlockToEditor(src, target);

              /* en fonction du type de block, on fait des actions */
              switch (blockCreated.content.type) {
                case 'text':
                  scope.$emit('blockTxtCreated', true);
                  CurrentObject.set('text', blockCreated);
                  break;
                case 'file':
                  // TODO Faire image
                  break;
              }
            }

          },
          /**
           * Evenement déclenché au over sur le droppable.
           * @param event
           * @param ui
           */
          over: function(event, ui) {
            //console.log('over');
          }
        });
      }
    };
  }]);
