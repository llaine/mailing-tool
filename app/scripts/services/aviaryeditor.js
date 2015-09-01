'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.AviaryEditor
 * @description
 * # AviaryEditor
 * Factory in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .factory('AviaryEditor', function(FileManager, $rootScope) {
    var Aviary = window.Aviary || {};

    var featherEditor = new Aviary.Feather({
      apiKey: '3c71db86613a4909bb076e7db99621b9',
      /**
       * Element on save.
       * @param imageID
       * @param newURL
       */
      onSave: function(imageID, newURL) {
        FileManager.updateImage(imageID, newURL);
        $rootScope.safeApply();
      }
    });

    /**
     * Lancement de l'éditeur avec l'image passé en paramètre
     * et la ligne du tableau dans laquelle l'image doit être.
     * @param image
     */
    function launchEditor(image) {
      featherEditor.launch({
        image: image.id,
        url: image.url
      });
    }

    return {
      launchEditor:launchEditor
    };

  });
