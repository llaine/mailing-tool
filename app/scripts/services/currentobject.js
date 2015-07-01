'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.currentObject
 * @description
 * # currentObject
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('CurrentObject', function() {
    var currentPic = {};
    var currentTxt = {};

    /**
     *
     * @param type
     * @param obj
     */
    function set(type, obj) {
      if (type === 'text') {
        currentTxt = obj;
      } else {
        currentPic = obj;
      }
    }

    /**
     *
     * @param type
     * @returns {{}}
     */
    function get(type) {
      return type === 'text' ? currentTxt : currentPic;
    }

    /**
     *
     * @param type
     */
    function destroy(type) {
      if (type === 'text') {
        currentTxt = {};
      } else {
        currentPic = {};
      }
    }

    return {
      set:set,
      get:get,
      destroy:destroy
    };

  });
