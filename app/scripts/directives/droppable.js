'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', function($rootScope, EventEmiter, BlockFactory) {
    return {
      restrict: 'A',
      /**
       * Link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        element.droppable({
          hoverClass:'state-hover',
          activeClass:'active',
          /**
           * Drop
           * @param event
           * @param ui
           */
          drop: function(event, ui) {
            var self = this;
            var src = ui.draggable[0];
            var targetBlock = angular.element(self).scope().block;
            var droppedBlock = angular.element(src).scope().block;
            var indexOnArray = scope.blocks.indexOf(targetBlock);

            /**
             * Mets à jour la pile de block à la main.
             *
             */
            function applyChanges() {
              if (indexOnArray !== -1) {
                scope.blocks[indexOnArray] = targetBlock;
                $rootScope.safeApply();
              } else {
                throw 'Position non connue dans la stack au moment d\'ajouter ' + targetBlock.type;
              }
            }

            if (src.tagName === 'LI') {

              var bf = new BlockFactory();
              var blockAttrs = {
                type:droppedBlock.type,
                nbColumns: droppedBlock.columns
              };

              if (droppedBlock.type === 'double') {
                blockAttrs.order = droppedBlock.order;
              }

              targetBlock = bf.create(blockAttrs);

              applyChanges();

              // On passe comme params, le block sur lequel on vient de dropper
              // et l'élement du dom correspondant.
              var opts = {
                block:targetBlock,
                tr:$(self).find('td')
              };
              // Le mode edition est toggled, avec les paramètres correspondants.
              EventEmiter.emit('edition:toggled', opts);
            }
          }
        });
      }
    };
  });
