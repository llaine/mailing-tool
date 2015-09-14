'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:buttonEditor
 * @description
 * # buttonEditor
 */
angular.module('newsletterEditorApp')
  .directive('buttonEditor', function() {
    return {
      templateUrl: 'views/directives/button-editor.html',
      restrict: 'E',
      scope: {
        block: '='
      },
      controllerAs:'btnEditorCtrl',
      bindToController:true,
      /**
       * Le controller de la directive.
       * @param $scope
       */
      controller: function($scope) {
        var self = this;

        // Setup des paramètres par défaut
        if (Object.keys(self.block.attributes.btn).length === 0) {
          self.block.attributes.btn ={
            height:32,
            width:96,
            bords:'5px',
            dispo:'left',
            backgroundColor:'#F2F2F2',
            link:'http://example.com',
            txt:'Cliquze ici!'
          }
        }
        /**
         * Lorsqu'on change le contenu du bouton,
         * mets à jour celui dans le model.
         */
        self.changes = function() {
          var style = {
            height:self.block.attributes.btn.height + 'px',
            width:self.block.attributes.btn.width + 'px',
            'border-radius': self.block.attributes.btn.bords,
            'background-color': self.block.attributes.btn.bgColor
          };

          self.block.content = '<button class="btn btn-default ' +
              self.block.attributes.btn.dispo +
              '" ng-style="' + JSON.stringify(style) + '">' +
              '<a href="' + self.block.attributes.btn.link + '">' +
              self.block.attributes.btn.txt + '</a>' +
              '</button>';
        };

        // Je veux que la width du bouton, soit toujours plus grande que le texte
        // donc j'augmente la width au fur et a mesure que le texte grandit.
        $scope.$watch(angular.bind(self,
            function() {
              return self.block.attributes.btn.txt;
            }),
            function(newVal, oldVal) {
              if (oldVal.length < newVal.length && newVal.length > 12) {
                self.block.attributes.btn.width += 10;
              } else {
                self.block.attributes.btn.width = 96;
              }
            }
        );
      }
    };
  });
