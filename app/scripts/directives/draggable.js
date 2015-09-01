'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('newsletterEditorApp')
  .directive('draggable', function() {
    return {
      restrict: 'A',
      scope: {
        containment:'@'
      },
      /**
       * Post link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        var opts = {};

        if (scope.containment) {
          opts = {
            containment:scope.containment
          };
        } else {
          opts = {
            helper:'clone',
            zIndex:10000
          };
        }

        element.draggable(opts);
      }
    };
  });
