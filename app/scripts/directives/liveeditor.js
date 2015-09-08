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
      templateUrl: 'views/directives/liveEditor.html',
      restrict: 'E',
      controllerAs: 'vm',
      bindToController: true,
      /**
       * Fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink($scope, element, attrs) {
        $scope.previewMode = true;

        $('#mailCadre').mCustomScrollbar();
      },
      /**
       * gre
       * @param $scope
       */
      controller: function($scope) {
        var self = this;
        self.blocks = BlocksManager.getAll();

        $scope.sortableOptions = {
          handle: 'a.handleDrag'
        };

        /**
         * Duplique le @param block à la ligne suivante.
         * @param event
         * @param block
         */
        self.duplicate = function(event, block) {
          var position = self.blocks.indexOf(block);

          // Assignation directe, pour conserver le prototypage de l'objet dupliqué.
          self.blocks.splice(position, 0, angular.copy(block));

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
        self.update = function(event, block) {
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
        self.delete = function(event, block) {
          var position = self.blocks.indexOf(block);

          self.blocks.splice(position, 1);

          $rootScope.safeApply();

          event.stopPropagation();
        };

        /**
         * Affiche la preview du mail
         */
        self.preview = function() {
          if (self.blocks.length > 0) {
            $modal.open({
              templateUrl: 'modalPreview.html',
              controller: 'ModalPreviewCtrl',
              resolve: {
                /**
                 * Renvoie les block du model.
                 * @returns {Array|*}
                 */
                BlocksModel: function() {
                  return self.blocks;
                },
                /**
                 * fezfze
                 * @returns {string}
                 */
                backgroundColor: function() {
                  var editorFrame = document.getElementById('mailCadre');
                  return DomManipulator.getStyleAttribute(editorFrame, 'background-color');
                },
                /**
                 * fezf
                 * @returns {string}
                 */
                borderType: function() {
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
