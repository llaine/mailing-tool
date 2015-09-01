'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:linkEditor
 * @description
 * # linkEditor
 */
angular.module('newsletterEditorApp')
  .directive('linkEditor', function () {
    return {
      templateUrl: '../../views/directives/link-editor.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs:'usCtrl',
      bindToController:true,
      controller: function() {
        this.options = {
          dispo:this.block.attributes.link ? this.block.attributes.link.dispo : 'left',
          txt:this.block.attributes.link ? this.block.attributes.link.txt : ''
        };

        this.changes = function() {
          if (!this.options.txt) {
            alert('Merci de renter un texte valide');
            return;
          }

          var align;
          var type;
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
          switch (this.block.type) {
            case 'online':
              type = 'online';
              break;
            case 'unsub':
              type = 'unsubscribe';
              break;
          }

          this.block.content.html = '<a rel="' + type +'" class="' + align + '">' + this.options.txt + '</a>';
          this.block.attributes.link = this.options;
        };

      }
    };
  });
