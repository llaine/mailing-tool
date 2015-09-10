'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.DraggableHelper
 * @description
 * # DraggableHelper
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('DraggableHelper', function () {
    /**
     * Récupère la position d'un élement par rapport à son parent.
     * @param element
     * @returns {{top: number, left: number}}
     */
    this.getPositionOfElement = function(element) {
      var elem = element.getBoundingClientRect(),
        parent = element.parentNode.parentNode.getBoundingClientRect(),
        top = parseInt(elem.top) - parseInt(parent.top),
        left = parseInt(elem.left) - parseInt(parent.left);

      return {
        top: top,
        left: left
      };
    };
  });

