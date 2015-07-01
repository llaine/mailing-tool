'use strict';

/**
 * @ngdoc filter
 * @name newsletterEditorApp.filter:sanitize
 * @function
 * @description
 * # sanitize
 * Filter in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .filter('sanitize', ['$sce', function($sce) {
    return function(input) {
      return $sce.trustAsHtml(input);
    };
  }]);
