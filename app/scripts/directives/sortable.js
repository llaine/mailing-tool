'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:sortable
 * @description
 * # sortable
 */
angular.module('newsletterEditorApp')
  .directive('sortable', function(BlocksManipulator, CurrentObject) {
    return {
      restrict: 'A',
      /**
       * fe
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {

        /**
         * Mets à jour un élement sur l'éditeur live.
         * @param position
         */
        scope.update = function() {
          /* récupère l'index sur lequel on viens de cliquer.  */
          var index = element.sortable('instance').currentItem[0].rowIndex;

          CurrentObject.destroy('text');
          var block = BlocksManipulator.getBlock(index);
          CurrentObject.set('text', block);
          scope.$emit('blockTxtCreated', true);

        };

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
            var cell = ui.item[0].children[0];
            var newPosition = ui.item.index() + 1; // Nous donne la position dans la liste
            var oldCell = $('#body').children().eq(ui.item.startPos - 1)[0].children[0];

            BlocksManipulator.changeBlockPos(ui.item.startPos , newPosition);

          }
        }).disableSelection();

      }
    };
  });
