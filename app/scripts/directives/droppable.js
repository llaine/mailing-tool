'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:droppable
 * @description
 * # droppable
 */
angular.module('newsletterEditorApp')
  .directive('droppable', function() {
    return {
      restrict: 'A',
      /**
       * Mink
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        element.droppable({
          drop: function() {
            console.log('ok');
          }
        });
      }
    };
  });
