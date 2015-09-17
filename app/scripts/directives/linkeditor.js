'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:linkEditor
 * @description
 * # linkEditor
 */
angular.module('newsletterEditorApp')
  .directive('linkEditor', function() {
    return {
      templateUrl: 'views/directives/link-editor.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs:'usCtrl',
      bindToController:true,
      /**
       * Le controller de la directive.
       */
      controller: function() {
        var self = this;

        var txt;
        if (this.block.type === 'online') {
          txt = 'Lien vers l\'affichage en ligne';
        } else {
          txt = 'Texte sur le lien';
        }

        self.block.attributes.link.dispo = self.block.attributes.link.dispo || 'left';
        self.block.attributes.link.txt = self.block.attributes.link.txt || txt;

        /**
         * Modifie les attributs du bouton lien.
         */
        self.changes = function() {
          var align;
          var type;
          // Modifie les options
          switch (self.block.attributes.link.dispo) {
            case 'left':
              align = 'pull-left';
              break;
            case 'right':
              align = 'pull-right';
              break;
            case 'center':
              align = 'center-block';
              break;
          }
          // En fonction du type
          switch (self.block.type) {
            case 'online':
              type = 'online';
              break;
            case 'unsub':
              type = 'unsubscribe';
              break;
          }

          self.block.content = '<a rel="' + type + '" class="' + align + '">' + self.block.attributes.link.txt + '</a>';
        };
      }
    };
  });
