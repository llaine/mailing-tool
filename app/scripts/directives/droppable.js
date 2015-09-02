'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', function($rootScope, EventEmiter, Block) {
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

            if (src.tagName === 'LI') {
              targetBlock = new Block(undefined, droppedBlock.type, droppedBlock.columns);

              $rootScope.safeApply();
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
