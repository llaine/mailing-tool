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
       * @param position
       */
      function applyStyle(block, position) {
        var index = BlocksManager.getAll().indexOf(block);
        var tr = angular.element(document.querySelectorAll('table.emailCompo'))
            .find('tr.dropzone:eq(' + index + ')');

        // Application du layout sur les cells
        if (block.type === 'double') {
          for (var i = 0; i < block.cells.length ; ++i) {
            var bloc = block.cells[i];
            if (bloc.contentStyle.td) {
              tr.find('td.cell-' + i).css(bloc.contentStyle.td);
            }

            if (bloc.contentStyle.img) {
              tr.find('td.cell-' + i).find('img').css(bloc.contentStyle.img);
            }
          }
        }

        for (var tag in block.contentStyle) {
          if (block.contentStyle.hasOwnProperty(tag)) {
            if (!isNaN(position)) {
              // On sélectionne la span correspondante au model
              // et on applique le css à l'intérieur
              var img = tr.find('span.node').find(tag)[position];
              angular.element(img).css(block.contentStyle[tag]);
            } else if (position === undefined) {
              // On sélectionne la span correspondante au model
              // et on applique le css à l'intérieur
              tr.find('span.node')
                  .find(tag).css(block.contentStyle[tag]);
            }
          }
        }
      }

      return {
        applyStyleToDom:applyStyle
      };
    });
