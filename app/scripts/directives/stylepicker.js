'use strict';

/**
 * @ngdoc directive
 * @name newsletterEditorApp.directive:stylePicker
 * @description
 * # stylePicker
 */
angular.module('newsletterEditorApp')
  .directive('stylePicker', function($rootScope, EventEmiter, DraggableHelper, GlobalStyles, StyleHelper) {
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
      controller: function($scope) {
        var vm = this;

        vm.params = {};
        vm.fonts = GlobalStyles.getFonts();
        vm.sizeTitle = GlobalStyles.getTitleSize();
        vm.size = GlobalStyles.getParagraphSize();
        vm.marginType = GlobalStyles.getMarginTypes();
        vm.marginSize = GlobalStyles.getMarginSize();

        $scope.isTransparent = false;
        $scope.isBlockFileTwice = false;
        vm.currentRowEdited = false;
        vm.displayGlobalStyles = false;

        EventEmiter.on('edition:toggled', function(event, opts) {
          vm.currentRowEdited = $(opts.tr).parents('tr:first');
          vm.displayGlobalStyles = true;
          if (opts.block.type === 'double') {
            $scope.isBlockFileTwice = opts.block.cells[0].type === 'file' && opts.block.cells[1].type === 'file';
          }
          // Paramètres par défaut du block
          vm.params = GlobalStyles.getDefaultParams(opts.block);

          vm.layoutDouble = GlobalStyles.getLayoutForBlockDouble(opts.block.type === 'double');
        });

        EventEmiter.on('panel:closed', function() {
          vm.currentRowEdited = false;
          vm.displayGlobalStyles = false;
          vm.block = undefined;
          $scope.isBlockFileTwice = false;
          vm.params = undefined;
          angular.element('#checkboxTransparent').attr('checked', false);
        });

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
         * Change le style des liens
         */
        vm.changeLink = function() {
          var align;
          var type;
          // Modifie les options
          switch (vm.block.attributes.link.dispo) {
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
          switch (vm.block.type) {
            case 'online':
              type = 'online';
              break;
            case 'unsub':
              type = 'unsubscribe';
              break;
          }

          vm.block.content = '<a rel="' + type + '" class="' + align + '">' + vm.block.attributes.link.txt + '</a>';
        };

        /**
         * Mets en transparent, le background de la row sélectionné.
         */
        vm.setToTransparent = function() {
          if (vm.block) {
            if (vm.block.metaStyle.isTransparent) {
              vm.block.metaStyle.isTransparent = false;
              vm.block.metaStyle.background = vm.block.metaStyle.oldBg;
            } else {
              vm.block.metaStyle.oldBg = vm.block.metaStyle.background;
              vm.block.metaStyle.isTransparent = true;
              vm.block.metaStyle.background = 'transparent';
            }
          }
        };

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
         * @param position
         */
        function applyStyle(elements, style, position) {
          elements.map(function() {
            if (vm.block) {
              if (vm.block.type === 'double' && !isNaN(position)) {
                vm.block.cells[position].setStyle(style, this.tagName);
              } else {
                vm.block.setStyle(style, this.tagName);
              }

              StyleHelper.applyStyleToDom(vm.block, position);
            } else {
              var scope = angular.element(this).scope();
              scope.$parent.block.setStyle(style, this.tagName);
              // Le two way data-bindings ne se fait pas pour le ng-style.
              // Obligé de forcer le reload du style inline.
              StyleHelper.applyStyleToDom(scope.$parent.block, position);
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
            color: vm.params.paragraph.color,
            'line-height': vm.params.paragraph.lineHeight
          });

          applyStyle(links, {
            'font-size': vm.params.link.fontSize,
            'font-family': vm.params.link.fontFamily,
            color: vm.params.link.color
          });
        };

        /**
         * Change les marges inline de l'image sur l'éditeur
         * Soit c'est un block double, auquel cas il y'a la imgPosition
         * correspondant à la position de li'mage dans le bloc qu'il faut mettre à jour
         * sinon on mets tout le bloc.
         * @param span
         * @param imgPosition
         */
        vm.onImgPosChanged = function(span, imgPosition) {
          var position = DraggableHelper.getPositionOfElement(span);
          var selector = getSelector();

          if (imgPosition === 0 || imgPosition === 1) {
            var images = selector.find('img:eq(' + imgPosition + ')');

            position.top > 100 ? position.top = 100 : position.top;
            position.left > 100 ? position.left = 100 : position.left;

            applyStyle(images, {
              'margin-top': position.top + '%',
              'margin-left': position.left + '%'
            }, imgPosition);

          } else {
            var img = selector.find('img');

            position.top > 100 ? position.top = 100 : position.top;
            position.left > 100 ? position.left = 100 : position.left;

            applyStyle(img, {
              'margin-top': position.top + '%',
              'margin-left': position.left + '%'
            });
          }
        };

        /**
         * Change la taille de l'image.
         * Soit le bloc est double auquel cas, on mets à jour
         * uniquement l'image correspondant à la position.
         * Sinon on mets tout à jour.
         */
        vm.changeImage = function(position) {
          var selector = getSelector();

          if (position === 0) {
            var img1 = selector.find('img:eq(' + position + ')');

            applyStyle(img1, {
              width:vm.params.image1.width  + 'px'
            }, position);
          } else if (position === 1) {
            var img2 = selector.find('img:eq(' + position + ')');

            applyStyle(img2, {
              width:vm.params.image2.width  + 'px'
            }, position);
          } else {
            var images = selector.find('img');

            applyStyle(images, {
              width:vm.params.layout.images.width  + 'px'
            });
          }

        };

        /**
         * Change le layout des block double.
         * La taille des deux colonnes du tableau en %
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
