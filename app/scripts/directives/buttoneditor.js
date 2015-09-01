'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:buttonEditor
 * @description
 * # buttonEditor
 */
angular.module('newsletterEditorApp')
  .directive('buttonEditor', function () {
    return {
      templateUrl: 'views/directives/button-editor.html',
      restrict: 'E',
      scope: {
        block: '='
      },
      controller: function ($scope) {
        // Les options de style par défaut qu'on peut appliquer sur le bouton.
        this.options = {
          height:this.block.attributes.btn ? this.block.attributes.btn.height : 32,
          width:this.block.attributes.btn ? this.block.attributes.btn.width : 96,
          bords:this.block.attributes.btn ? this.block.attributes.btn.bords  : '5px',
          link:this.block.attributes.btn ? this.block.attributes.btn.link  : '',
          dispo:this.block.attributes.btn ? this.block.attributes.btn.dispo  : 'left',
          bgColor:this.block.attributes.btn ? this.block.attributes.btn.bgColor  : '#F2F2F2',
          txt:this.block.attributes.btn ? this.block.attributes.btn.txt : 'Cliquez ici !'
        };

        /**
         * Lorsqu'on change le contenu du bouton,
         * mets à jour celui dans le model.
         */
        this.changes = function () {
          var style = {
            height:this.options.height + 'px',
            width:this.options.width + 'px',
            'border-radius': this.options.bords,
            'background-color': this.options.bgColor
          };
          var align;

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

          var content = '<button class="btn btn-default ' + align + '" ng-style="' + JSON.stringify(style) +'">' +
                        '<a href="' + this.options.link +'">' + this.options.txt + '</a>' +
                        '</button>';

          this.block.setStyle(style, 'button');
          this.block.content.html = content;
          // Stocke les méta données du bouton, pour les récupérer + facilement par la suite
          this.block.attributes.btn = this.options;
        };

        // Je veux que la width du bouton, soit toujours plus grande que le texte
        // donc j'augmente la width au fur et a mesure que le texte grandit.
        $scope.$watch(angular.bind(this,
            function(){
              return this.options.txt
            }),
            function (newVal, oldVal) {
              if (oldVal.length < newVal.length && newVal.length > 12) {
                this.options.width += 10;
              } else {
                this.options.width = 96;
              }
            }.bind(this)
        );

      },
      controllerAs:'btnEditorCtrl',
      bindToController:true
    };
  });
