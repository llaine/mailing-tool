'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.styleHelper
 * @description
 * # styleHelper
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
    .service('StyleHelper', function(BlocksManager) {
      return {
        applyStyleToDom:applyStyle
      };

      /**
       * Le style n'est pas two-way databinding sur les élements générés
       * automatiquement donc impossible d'utiliser ng-style.
       * Par conséquent, je dois obligatoirement appliquer le style aux élements
       * moi même.
       * Les styles sont stocké dans le model dans un attribut <b>contentStyle</b>
       * pour chaque noeud html les styles correspondants.
       * Ex :
       * style:{
         *  p:{// ici du style},
         *  a:{// ici du style},
         *  img: {//ici du style}
         *  etc
         * }
       * @param block
       */
      function applyStyle(block) {
        var index = BlocksManager.getAll().indexOf(block);
        var tr = angular.element(document.querySelectorAll('table.emailCompo'))
            .find('tr.dropzone:eq(' + index + ')');

        // Application du layout sur les cells
        if (block.type === 'double') {
          for (var i = 0; i < block.cells.length ; ++i) {
            if (block.cells[i].style.td) {
              tr.find('td.cell-' + i).css(block.cells[i].style.td);
            }
          }

        }

        for (var tag in block.style) {
          if (block.style.hasOwnProperty(tag)) {
            // On sélectionne la span correspondante au model
            // et on applique le css à l'intérieur
            tr.find('span.node')
                .find(tag).css(block.style[tag]);
          }
        }
      }
    });
