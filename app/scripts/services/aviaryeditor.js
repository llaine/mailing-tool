'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.AviaryEditor
 * @description
 * # AviaryEditor
 * Factory in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .factory('AviaryEditor', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
