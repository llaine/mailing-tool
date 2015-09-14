'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:stylePicker
 * @description
 * # stylePicker
 */
angular.module('newsletterEditorApp')
  .directive('stylePicker', function(EventEmiter, DraggableHelper, GlobalStyles, StyleHelper) {
    return {
      templateUrl: 'views/directives/stylePicker.html',
      restrict: 'E',
      scope: {
        block:'='
      },
      controllerAs:'stylePickerCtrl',
      bindToController:true,
      /**
       * Controller
       * @param $scope
       * @param $element
       */
      controller: function() {
        var vm = this;

        vm.params = GlobalStyles.getDefaultParams();
        vm.fonts = GlobalStyles.getFonts();
        vm.sizeTitle = GlobalStyles.getTitleSize();
        vm.size = GlobalStyles.getParagraphSize();
        vm.marginType = GlobalStyles.getMarginTypes();
        vm.marginSize = GlobalStyles.getMarginSize();
        if (vm.block) {
          vm.layoutDouble = GlobalStyles.getLayoutForBlockDouble(vm.block.type === 'double');
        }

        /**
         * Change les style des boutons
         */
        vm.changesButton = function() {
          var style = {
            height:vm.block.attributes.btn.height + 'px',
            width:vm.block.attributes.btn.width + 'px',
            'border-radius': vm.block.attributes.btn.bords,
            'background-color': vm.block.attributes.btn.backgroundColor
          };
          var align;

          switch (vm.block.attributes.btn.dispo) {
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

          var content = '<button class="btn btn-default ' + align + '" ng-style="' + JSON.stringify(style) + '">' +
              '<a href="' + vm.block.attributes.btn.link + '">' + vm.block.attributes.btn.txt + '</a>' +
              '</button>';

          vm.block.setStyle(style, 'button');
          vm.block.content = content;
        };

        /**
         * Mets en transparent, le background de la row sélectionné.
         */
        vm.setToTransparent = function() {
          if (vm.block.metaStyle.isTransparent) {
            vm.block.metaStyle.isTransparent = false;
            vm.block.metaStyle.background = vm.block.metaStyle.oldBg;
          } else {
            vm.block.metaStyle.oldBg = vm.block.metaStyle.background;
            vm.block.metaStyle.isTransparent = true;
            vm.block.metaStyle.background = 'transparent';
          }
        };

        vm.currentRowEdited = false;
        vm.displayGlobalStyles = false;

        EventEmiter.on('edition:toggled', function(event, opts) {
          vm.currentRowEdited = $(opts.tr).parents('tr:first');
          vm.displayGlobalStyles = true;
        });

        EventEmiter.on('panel:closed', function() {
          vm.currentRowEdited = false;
          vm.displayGlobalStyles = false;
          vm.block = undefined;
        });

        /**
         * Retourne l'élement courant sélectionné
         * ou tout l'éditeur en fonction.
         * @returns {*}
         */
        function getSelector() {
          return vm.currentRowEdited ? angular.element(vm.currentRowEdited) : angular.element('#emailTemplate1');
        }

        /**
         * Mets à jour le style pour un certains nombre d'elements.
         * Dans le dom et dans le model.
         * @param elements
         * @param style
         */
        function applyStyle(elements, style) {
          elements.map(function() {
            if (vm.block) {
              vm.block.setStyle(style, this.tagName);
              StyleHelper.applyStyleToDom(vm.block);
            } else {
              var scope = angular.element(this).scope();
              scope.$parent.block.setStyle(style, this.tagName);
              // Le two way data-bindings ne se fait pas pour le ng-style.
              // Obligé de forcer le reload du style inline.
              StyleHelper.applyStyleToDom(scope.$parent.block);
            }
          });
        }

        /**
         * Change le style des titles
         */
        vm.changeTitle = function() {
          var selector = getSelector();
          var titles = selector.find('h1, h2, h3, h4, h5, h6');
          var opts = {
            'font-size': vm.params.title.fontSize,
            'font-family': vm.params.title.fontFamily,
            color: vm.params.title.color,
            'font-weight': vm.params.title.fontWeight,
            'line-height': vm.params.title.lineHeight
          };

          applyStyle(titles, opts);
        };

        /**
         * Change le style du background de l'editeur mail et ajoute des potentiels contour.
         */
        vm.changeBackground = function() {
          var selector = getSelector();
          var background = angular.element('#mailCadre');

          if (vm.block) {

            applyStyle(selector, {
              'background': vm.params.background.bgColor
            });

          } else {
            background.css({
              'background': vm.params.background.bgColor
            });

            selector.css('border',
                vm.params.background.borderSize.size + ' ' +
                vm.params.background.borderType.type + ' ' +
                vm.params.background.borderColor
            );
          }
        };

        /**
         * Change le style des <p> et <a>
         */
        vm.changeParagraph = function() {
          var selector = getSelector();
          var paragraphs = selector.find('p');
          var links = selector.find('a:not(.no-style)');

          applyStyle(paragraphs, {
            'font-size': vm.params.paragraph.fontSize,
            'font-family': vm.params.paragraph.fontFamily,
            color: vm.params.paragraph.color
          });

          applyStyle(links, {
            'font-size': vm.params.link.fontSize,
            'font-family': vm.params.link.fontFamily,
            color: vm.params.link.color
          });
        };

        /**
         * ge
         * @param span
         */
        vm.onImgPosChanged = function(span) {
          var position = DraggableHelper.getPositionOfElement(span);

          var selector = getSelector();
          var images = selector.find('img');

          position.top > 100 ? position.top = 100 : position.top;
          position.left > 100 ? position.left = 100 : position.left;

          applyStyle(images, {
            'margin-top': position.top + '%',
            'margin-left': position.left + '%'
          });
        };

        /**
         * Change image layout.
         */
        vm.changeImage = function() {
          var selector = getSelector();

          var images = selector.find('img');

          applyStyle(images, {
            width:vm.params.layout.images.width  + 'px'
          });
        };

        /**
         * Change le layout des block double
         * et des images.
         */
        vm.changeLayout = function() {
          var selector = getSelector();

          selector.find('.table-block-double').map(function() {
            var table = $(this);
            var cells = table.find('td');
            var newRule = vm.params.layout.blockDouble.value.split('-');
            var blockDouble = angular.element(cells).scope().block;

            for (var i = 0 ; i < blockDouble.cells.length ; ++i) {
              blockDouble.cells[i].setStyle({width:newRule[i] + '%'}, cells[i].tagName);
            }

            StyleHelper.applyStyleToDom(blockDouble);
          });
        };
      }
    };
  });
