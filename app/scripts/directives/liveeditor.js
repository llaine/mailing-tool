'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:liveEditor
 * @description
 * # liveEditor
 */
angular.module('newsletterEditorApp')
  .directive('liveEditor', function(Blocks, BlocksManipulator, CurrentObject) {
    return {
      templateUrl: '../views/directives/liveEditor.html',
      restrict: 'E',
      /**
       * Fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        /**
         * Mets à jour un élement sur l'éditeur live.
         * @param position
         */
        scope.update = function(position) {
          var block = BlocksManipulator.getBlock(position);

          if (block) {
            CurrentObject.set('text', block);
            scope.$emit('blockTxtCreated', true);
          }
        };
      },
      /**
       * gre
       * @param $scope
       */
      controller: function($scope) {
        $scope.show = false;

        /**
         * Fonction d'apply avec des garde fou pour éviter
         * d'appeler une boucle digest or de l'event loop angularjs.
         * Et donc de thrower une excpetion de type ($apply) already in progress.
         * @param fn
         */
        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        $scope.$on('blockTxtSaved', function() {
          BlocksManipulator.updateContent(CurrentObject.get('text'));
        });

        /* lorsqu'on créer un block de type texte, on affiche l'éditeur */
        $scope.$on('blockTxtCreated', function(e, msg) {
          $scope.safeApply(function() {
            $scope.show = true;
          });
        });

        /* lorsqu'on le supprime, on ne l'affiche plus. */
        $scope.$on('blockTxtDestroyed', function() {
          $scope.safeApply(function() {
            $scope.show = false;
          });
        });

        /**
         *
         */
        $scope.export = function() {
          console.log(Blocks.getAll());
        };
      }
    };
  });
