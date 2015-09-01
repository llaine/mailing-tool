'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:BlockNode
 * @description
 * # BlockNode
 */
angular.module('newsletterEditorApp')
  .directive('renderStyleOnBound', function(StyleHelper) {
    /**
     * Directive assez spéciale, car elle sert uniquement à réappliquer des styles inlines
     * sur le html qui est automatiquement généré par la directive ng-bind-html.
     */
    return {
      priority:10,
      /**
       * Link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function(scope, element, attrs) {
        /**
         * Lorsque ngBindHtml a changé (donc que le dom a été rerender)
         * on réapplique le style contenu dans model à la vue.
         */
        scope.$watch(attrs.ngBindHtml, function() {
          StyleHelper.applyStyleToDom(scope.block);
        });
      }
    };
  });
