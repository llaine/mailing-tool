'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:positionBtn
 * @description
 * # positionBtn
 */
angular.module('newsletterEditorApp')
  .directive('positionBtn', function() {
    return {
      template:
      '<div id="container-for-draggable" style="background: #e3e3e3; height: 50px; width: 86px;"> ' +
        '<span id="btn-movable" class="btn btn-default btn-sm" draggable containment="parent">' +
          '<span class="glyphicon glyphicon-picture"></span>' +
        '</span>' +
      '</div>',
      restrict: 'E',
      scope: {
        onChange:'='
      },
      /**
       * La fonction link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function(scope, element, attrs) {
        element.find('span').bind('dragstop', function() {
          // On appelle la fonction passée à la directive, qui va s'occuper de mettre à jour le model. .
          scope.onChange(this);
        });
      }
    };
  });
