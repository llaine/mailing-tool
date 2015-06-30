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
      /**
       * link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {

        element.draggable({
          helper:'clone'
        });
      }
    };
  });
