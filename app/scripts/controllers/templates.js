'use strict';

/**
 * @ngdoc function
 * @name newsletterEditorApp.controller:TemplatesCtrl
 * @description
 * # TemplatesCtrl
 * Controller of the newsletterEditorApp
 */
angular.module('newsletterEditorApp')
  .controller('TemplatesCtrl', function($location, availableTemplates) {
    this.availableTemplates = availableTemplates;

    /**
     * Attribut le template selectionné à celui qui vient d'être cliqué
     * @param selectedTpl
     */
    this.select = function(selectedTpl) {
      this.selected = selectedTpl;
    };

    /**
     * Lance l'éditeur avec un template sélectionné,
     * ou non.
     */
    this.launchEditor = function() {
      var path = this.selected ? '/editor?fromTemplate=' + this.selected.id : '/editor';
      $location.url(path);
    };
  });
