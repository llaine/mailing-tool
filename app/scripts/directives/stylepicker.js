'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:stylePicker
 * @description
 * # stylePicker
 */
angular.module('newsletterEditorApp')
  .directive('stylePicker', function(EventEmiter, DraggableHelper) {
    return {
      templateUrl: 'views/directives/stylePicker.html',
      restrict: 'E',
      scope: {
        block:'=',
        modeEdition:'='
      },
      /**
       * Controller
       * @param $scope
       * @param $element
       */
      controller: function($scope, $element) {
        $scope.fonts = [
          {text:'Times New Roman'},
          {text:'Arial'},
          {text:'Helvetica'},
          {text:'Lucida'},
          {text:'Gill Sans Extrabold'},
          {text:'Courier'},
          {text:'Times'},
          {text:'Verdana'},
          {text:'Lucida Console'}
        ];
        $scope.sizeTitle = [
          {size:'30px'},
          {size:'32px'},
          {size:'34px'},
          {size:'36px'}
        ];
        $scope.size = [
          {size:'10px'},
          {size:'12px'},
          {size:'14px'},
          {size:'16px'}
        ];
        $scope.layoutDouble = [
          {layout:'One thrid', value:'37.5-75'},
          {layout:'Two Third', value:'75-50'},
          {layout:'Half', value:'50-50'},
          {layout:'One half', value:'25-75'},
          {layout:'Three half', value:'75-25'}
        ];
        $scope.params = {
          title: {
            color:'#00000',
            fontSize:30 + 'px',
            fontFamily:'Arial',
            fontWeight:'normal',
            lineHeight:'1'
          },
          paragraph: {
            color:'#00000',
            fontSize:12 + 'px',
            fontFamily:'Arial'
          },
          link: {
            color:'#00000',
            fontSize:12 + 'px',
            fontFamily:'Arial'
          },
          background: {
            // La couleur de fond de l'email
            bgColor:'#FFFFF',
            // La bordure autour de l'email
            borderSize:'1px',
            borderType:'solid',
            borderColor:'black'
          },
          layout: {
            blockDouble:{layout:'Half', value:'400-400'},
            images: {
              margin: {
                left:1,
                top:1,
                right:1,
                bottom:1
              },
              width:20
            }
          }
        };

        $scope.setToTransparent = function() {
          if ($scope.block.attributes.metaStyle.background) {
            delete $scope.block.attributes.metaStyle.background
          } else {
            $scope.block.attributes.metaStyle.background = 'transparent';
          }
        };

      },
      /**
       * Post link
       * @param scope
       * @param element
       * @param attrs
       */
      link: function postLink(scope, element, attrs) {
        scope.isBlockDouble = false;
        scope.currentRowEdited = false;
        scope.displayGlobalStyles = false;

        EventEmiter.on('edition:toggled', function(event, opts) {
          var row = $(opts.tr).parents('tr:first');
          scope.currentRowEdited = row;
          scope.displayGlobalStyles = true;
        });

        EventEmiter.on('panel:closed', function() {
          scope.currentRowEdited = false;
          scope.displayGlobalStyles = false;
        });

        /**
         * Retourne l'élement courant sélectionné
         * ou tout l'éditeur en fonction.
         * @returns {*}
         */
        function getSelector() {
          return scope.currentRowEdited ? angular.element(scope.currentRowEdited) : angular.element('#emailTemplate1');
        }

        /**
         * Mets à jour le style pour un certains nombre d'elements.
         * Dans le dom et dans le model.
         * @param elements
         * @param style
         */
        function applyStyle(elements, style) {
          elements.map(function() {
            var $scope = angular.element(this).scope();
            $scope.block.setStyle(style, this.tagName);
            // Le two way data-bindings ne se fait pas pour le ng-style.
            // Obligé de forcer le reload du style inline.
            scope.applyStyle($scope.block);
          });
        }

        /**
         * Change le style des titles
         */
        scope.changeTitle = function() {
          var selector = getSelector();
          var titles = selector.find('h1, h2, h3, h4, h5, h6');

          applyStyle(titles, {
            'font-size': scope.params.title.fontSize,
            'font-family': scope.params.title.fontFamily,
            color: scope.params.title.color,
            'font-weight': scope.params.title.fontWeight,
            'line-height': scope.params.title.lineHeight
          });

        };

        /**
         * Change le style du background de l'editeur mail et ajoute des potentiels contour.
         */
        scope.changeBackground = function() {
          var selector = getSelector();
          var background = angular.element('#mailCadre');

          if (scope.currentRowEdited) {

            applyStyle(selector, {
              'background': scope.params.background.bgColor
            });

          } else {
            background.css({
              'background': scope.params.background.bgColor
            });

            selector.css('border',
              scope.params.background.borderSize + ' ' +
              scope.params.background.borderType + ' ' +
              scope.params.background.borderColor
            );
          }


        };

        /**
         * Change le style des <p> et <a>
         */
        scope.changeParagraph = function() {
          var selector = getSelector();
          var paragraphs = selector.find('p');
          var links = selector.find('a:not(.no-style)');

          applyStyle(paragraphs, {
            'font-size': scope.params.paragraph.fontSize,
            'font-family': scope.params.paragraph.fontFamily,
            color: scope.params.paragraph.color
          });

          applyStyle(links, {
            'font-size': scope.params.link.fontSize,
            'font-family': scope.params.link.fontFamily,
            color: scope.params.link.color
          });
        };

        scope.onImgPosChanged = function (span) {
          var position = DraggableHelper.getPositionOfElement(span);

          var selector = getSelector();
          var images = selector.find('img');

          position.top > 100 ? position.top = 100 : position.top;
          position.left > 100 ? position.left = 100 : position.left;

          // TODO : Trouver une solution pour que ça fonctionne vraiment bien.
          applyStyle(images, {
            'margin-top': position.top + '%',
            'margin-left': position.left + '%'
          })

        };

        /**
         * Change le layout des block double
         * et des images.
         */
        scope.changeLayout = function() {
          var selector = getSelector();

          var images = selector.find('img');

          applyStyle(images, {
            width:scope.params.layout.images.width  + '%'
          });

          selector.find('.table-block-double').map(function() {
            var table = $(this);
            var cells = table.find('td');
            var newRule = scope.params.layout.blockDouble.value.split('-');
            var blockDouble = angular.element(cells).scope().block;

            for (var i = 0 ; i < blockDouble.cells.length ; ++i) {
              blockDouble.cells[i].setStyle({width:newRule[i] + '%'}, cells[i].tagName)
            }

            scope.applyStyle(blockDouble);
          });
        };

        /**
         * Enlève tout les styles inline.
         */
        scope.reset = function() {
          var selector = getSelector();

          /**
           * Supprime le style inline
           * @param node
           */
          function removeAttr(node) {
            selector.find(node).removeAttr('style');
          }

          removeAttr('p');
          removeAttr('a');
          removeAttr('img');
          removeAttr('h1, h2, h3, h4, h5, h6');

          selector.removeAttr('style');
        };
      }
    };
  });
