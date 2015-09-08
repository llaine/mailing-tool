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
        this.options = {
          dispo:this.block.attributes.link ? this.block.attributes.link.dispo : 'left',
          txt:this.block.attributes.link ? this.block.attributes.link.txt : ''
        };

        /**
         * Modifie les attributs du bouton lien.
         */
        this.changes = function() {
          var align;
          var type;
          // Modifie les options
          switch (this.options.dispo) {
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
          switch (this.block.type) {
            case 'online':
              type = 'online';
              break;
            case 'unsub':
              type = 'unsubscribe';
              break;
          }

          this.block.content = '<a rel="' + type + '" class="' + align + '">' + this.options.txt + '</a>';
          this.block.attributes.link = this.options;
        };
      }
    };
  });
