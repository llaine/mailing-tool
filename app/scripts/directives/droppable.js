'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', function($rootScope, EventEmiter, BlockDouble) {
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

            /**
             * Affiche sur l'éditeur le html sans
             * faire apparaitre le panneau d'édition
             * @param html
             */
            function displayOnEditor(html) {
              targetBlock.content.html = html;
              $rootScope.safeApply();
            }

            if (src.tagName === 'LI') {
              targetBlock.type = droppedBlock.type;


              if (droppedBlock.columns === 1) {
                switch (droppedBlock.type) {
                  case 'divider':
                    displayOnEditor('');
                    break;
                  case 'unsub':
                    displayOnEditor('<a rel="unsubscribe">Lien de désinscription</a>');
                    break;
                  case 'online':
                    displayOnEditor('<a rel="online">Voir la version en ligne</a>');
                    break;
                  case 'button':
                    displayOnEditor('<button class="btn btn-default"><a href="#">Cliquez ici !</a></button>');
                    break;
                  default:
                    break;
                }
              } else {
                /* On remplace le block courant par un block double */
                var newBlockDouble = new BlockDouble(droppedBlock.type);

                if (droppedBlock.type === 'footer') {
                  // Réassignation du type, sinon les block de type footer sont considérés comme double
                  // et le design pète.
                  newBlockDouble.type = droppedBlock.type;
                }
                // scope.blocks, correspond aux block sur le liveEditor, définit dans liveEditor.js
                var index = scope.blocks.indexOf(targetBlock);
                scope.blocks[index] = newBlockDouble;
                targetBlock = scope.blocks[index];
              }

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
