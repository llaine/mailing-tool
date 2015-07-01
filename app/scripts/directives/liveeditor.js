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

      },
      /**
       * gre
       * @param $scope
       */
      controller: function($scope) {
        $scope.show = false;

        function hideTextEditor() {
          $scope.safeApply(function() {
            $scope.show = false;
          });
        }

        function showTextEditor() {
          $scope.safeApply(function() {
            $scope.show = true;
          });
        }

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
          hideTextEditor();
        });

        /* lorsqu'on créer un block de type texte, on affiche l'éditeur */
        $scope.$on('blockTxtCreated', function() {
          showTextEditor();
        });

        /* lorsqu'on le supprime, on ne l'affiche plus. */
        $scope.$on('blockTxtDestroyed', function() {
          hideTextEditor();
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
