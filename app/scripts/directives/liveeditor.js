'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:liveEditor
 * @description
 * # liveEditor
 */
angular.module('newsletterEditorApp')
  .directive('liveEditor', function($rootScope, $log, $modal, BlocksManager, EventEmiter, DomManipulator) {
    return {
      templateUrl: '../views/directives/liveEditor.html',
      restrict: 'E',
      /**
       * Fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink($scope, element, attrs) {
        $scope.previewMode = true;
        $('#mailCadre').mCustomScrollbar();

        /**
         * Le style n'est pas two-way databinding
         * donc impossible d'utiliser ng-style.
         * Par conséquent, je dois obligatoirement appliquer le style aux élements
         * moi même.
         * Les styles sont stocké dans le model dans un attribut <b>style</b>
         * Pour chaque noeud html les styles correspondants.
         * Ex :
         * style:{
         *  p:{// ici du style},
         *  a:{// ici du style},
         *  img: {//ici du style}
         *  etc
         * }
         * @param block
         */
        $scope.applyStyle = function(block) {
          var idx = $scope.blocks.indexOf(block);
          var tr = element.find('tr.dropzone:eq(' + idx + ')');

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


        };
      },
      /**
       * gre
       * @param $scope
       */
      controller: function($scope) {
        $scope.blocks = BlocksManager.getAll();

        $scope.sortableOptions = {
          handle: 'a.handleDrag'
        };

        /**
         * Duplique le @param block à la ligne suivante.
         * @param event
         * @param block
         */
        $scope.duplicate = function(event, block) {
          var position = $scope.blocks.indexOf(block);

          // Assignation directe, pour conserver le prototypage de l'objet dupliqué.
          $scope.blocks.splice(position, 0, angular.copy(block));

          $rootScope.safeApply();

          // On stoppe la propagation pour éviter que la fonction update
          // soit appelé puisqu'elle est bindé sur le block parent.
          event.stopPropagation();
        };

        /**
         * Mise à jour de l'élement cliqué.
         *
         * @param event
         * @param block
         */
        $scope.update = function(event, block) {
          // TODO Eviter de toggle l'éditeur quand block divider.
          $log.info('update appelé depuis liveEditor');
          var tr = $(event.target);
          var opts = {block:block, tr:tr};

          EventEmiter.emit('edition:toggled', opts);
        };

        /**
         * Supprime la ligne cliqué.
         * @param event
         * @param block
         */
        $scope.delete = function(event, block) {
          var position = $scope.blocks.indexOf(block);

          $scope.blocks.splice(position, 1);

          $rootScope.safeApply();

          event.stopPropagation();
        };

        /**
         * Exporte les données.
         */
        $scope.export = function() {
          console.log($scope.blocks);
        };

        /**
         * Affiche la preview du mail
         */
        $scope.preview = function() {
          if ($scope.blocks.length > 0) {
            $modal.open({
              templateUrl: 'modalPreview.html',
              controller: 'ModalPreviewCtrl',
              resolve: {
                /**
                 * Renvoie les block du model.
                 * @returns {Array|*}
                 */
                BlocksModel: function() {
                  return $scope.blocks;
                },
                backgroundColor: function () {
                  var editorFrame = document.getElementById('mailCadre');
                  return DomManipulator.getStyleAttribute(editorFrame, 'background-color');
                },
                borderType: function () {
                  var emailTemplate = document.getElementById('emailTemplate1');
                  return DomManipulator.getStyleAttribute(emailTemplate, 'border');
                }
              }
            });
          }
        };
      }
    };
  });
