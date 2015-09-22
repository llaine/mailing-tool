'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:positionBtn
 * @description
 * # imageEditor
 */
angular.module('newsletterEditorApp')
    .directive('imageEditor', function() {
      return {
        templateUrl:'views/directives/image-editor.html',
        restrict:'E',
        scope:{
          onImgChanged:'=',
          changeWidth:'=',
          model:'=',
          position:'='
        }
      };
    });
