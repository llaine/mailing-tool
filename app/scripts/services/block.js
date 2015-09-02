'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.block
 * @description
 * # block
 * Factory in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
    .factory('Block', function(FileManager) {
      /**
       *
       * @param content
       * @param type
       * @param nbColumns
       * @returns {{id: string, cells: Array, content: {html: *}, attributes: {metaStyle: {}}, contentStyle: {}, type: *, setStyle: setStyle, setHtml: setHtml, setType: setType, update: update, toString: toString}}
       */
      return function block(content, type, nbColumns) {
        var instanceOfSelf = this.constructor;
        var Block = {
          id: Math.random().toString(36).slice(2),
          attributes: {
            metaStyle: {}
          },
          contentStyle: {},
          type: nbColumns > 1 ? 'double' : type,
          setStyle: setStyle,
          setHtml: setHtml,
          setType: setType,
          update: update,
          toString: toString,
          cells: createCells(nbColumns, type, instanceOfSelf),
          content: nbColumns > 1 ? {html:undefined} : createContent(type, content, FileManager)
        };

        return Block;
        ////////////////// Définition des fonctions /////////////////

        /**
         * Setup le style du block
         * @param style
         * @param node
         */
        function setStyle(style, node) {
          node = node.toLowerCase();

          if (this.contentStyle[node]) {
            for (var props in style) {
              if (style.hasOwnProperty(props)) {
                this.contentStyle[node][props] = style[props];
              }
            }
          } else {
            this.contentStyle[node] = style;
          }
        }

        /**
         * Setup le contenu html du block
         * @param html
         */
        function setHtml(html) {
          this.content.html = html;
        }

        /**
         * Setup le type du block
         * @param type
         */
        function setType(type) {
          this.type = type;
        }

        /**
         * Mets à jour le style et le contenu html du block
         * @param html
         * @param type
         */
        function update(html, type) {
          this.setHtml(html);
          this.setType(type);
        }

        /**
         * ezf
         * @returns {*}
         */
        function toString() {
          var self = this;
          var div = document.createElement('div');

          /**
           * Applique le style au contenu du block
           */
          function cssToStyle() {
            for (var tag in self.style) {
              if (self.contentStyle.hasOwnProperty(tag)) {
                var item = angular.element(div).find(tag);
                item.css(self.contentStyle[tag]);
              }
            }
          }

          if (this.cells.length > 1) {
            var strings = [];

            for (var i = 0; i < this.cells.length; i++) {
              var obj = this.cells[i];
              div.innerHTML = obj.content.html;
              cssToStyle();
              strings.push({html: div.innerHTML, width: obj.style.td ? obj.style.td.width : '50%'});
            }
            return [strings];

          } else {
            if (self.type === 'divider') {
              if (self.attributes.metaStyle) {
                angular.element(div).css(self.attributes.metaStyle);
              }
            } else {
              // Crée un container dans lequel on va pouvoir rechercher nos tags
              div.innerHTML = self.content.html;
              cssToStyle();
            }
            return div.innerHTML;
          }
        }
      }
    });

/**
 * iezfzef
 * @param nbColumns
 * @param type
 * @param Block
 * @returns {Array}
 */
function createCells(nbColumns, type, Block) {
  if (nbColumns < 2) { return []; }
  var cells = [];
  /**
   * Détermirne le type de chaque cellule.
   * @param typOfContent
   * @returns {*}
   */
  function getType(typOfContent) {
    var type;
    if (typOfContent === 'text') {
      type = 'txt';
    } else if (typOfContent === 'file') {
      type = 'file';
    } else if (typOfContent === 'social') {
      type = 'social';
    }
    return type;
  }
  var typeArray = type.split('-');

  for (var i = 0; i < nbColumns; i++) {
    cells.push(new Block(undefined, typeArray[i], 1));
  }

  return cells;
}

/**
 * fzef
 * @param type
 * @param content
 * @param FileManager
 * @returns {{html: *}}
 */
function createContent(type, content, FileManager) {
  var html;
  if (!content) {
    switch (type) {
      case 'text':
        html = '<p>Déposer votre contenu ici</p>';
        break;
      case 'file':
        html = '<p>Sélectionner un fichier</p>';
        break;
      case 'divider':
        html = '';
        break;
      case 'unsub':
        html = '<a rel="unsubscribe">Lien de désinscription</a>';
        break;
      case 'online':
        html = '<a rel="online">Voir la version en ligne</a>';
        break;
      case 'button':
        html = '<button class="btn btn-default"><a href="#">Cliquez ici !</a></button>';
        break;
      case 'social':
        html = FileManager.getSocialImages().map(function(social) {
          return social.img;
        }).join('');
        break;
      default:
        html = undefined;
        break;
    }
  } else {
    html = content;
  }

  return {
    html:html
  };
}