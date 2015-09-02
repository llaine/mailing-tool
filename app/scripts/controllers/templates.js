'use strict';

/**
 * @ngdoc function
 * @name newsletterEditorApp.controller:TemplatesCtrl
 * @description
 * # TemplatesCtrl
 * Controller of the newsletterEditorApp
 */
angular.module('newsletterEditorApp')
  .controller('TemplatesCtrl', function(availableTemplates) {
    this.availableTemplates = availableTemplates;
    /**
     * Fonction s'executant, lorsqu'on sélectionne un template.
     * @param selectedTpl
     */
    this.select = function(selectedTpl) {
      console.log(selectedTpl);
      this.selected = selectedTpl;
    };

    /**
     * Lance l'éditeur avec un template sélectionné,
     * ou non.
     */
    this.launchEditor = function() {

    };
  });
