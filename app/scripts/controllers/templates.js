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

    this.html = '<html><head><style>p{color:orange;}</style></head><body><p>Prévisualisation</p><p>Test 2</p><p>Test 3</p></body></html>';
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
