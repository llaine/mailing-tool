'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.block
 * @description
 * # block
 * Factory in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .factory('Block', function() {
    return function Block(content, type, columns) {
      this.content = {
        html:content
      };
      this.attributes = {
        metaStyle: {}
      };
      this.type = type;
      this.id = Math.random().toString(36).slice(2);
      this.style = {};

      /**
       * Setter de l'attribut style.
       * Si un attribut style existe déjà,
       * on append les nouveaux style à celui-ci.
       * @param style
       * @param node
       */
      this.setStyle = function(style, node) {
        node = node.toLowerCase();

        if (this.style[node]) {
          for (var props in style) {
            if (style.hasOwnProperty(props)) {
              this.style[node][props] = style[props];
            }
          }
        } else {
          this.style[node] = style;
        }
      };

      /**
       * Mets à jour le html
       * @param html
       */
      this.setHtml = function(html) {
        this.content.html = html;
      };

      /**
       * Mets à jour le type
       * @param type
       */
      this.setType = function(type) {
        this.type = type;
      };

      /**
       * A partir d'un autre objet block
       * Modifie les attributs de celui passé en paramètre.
       * @param html
       * @param type
       */
      this.update = function(html, type) {
        this.setHtml(html);
        this.setType(type);
      };

      /**
       * Retourne, le contenu html avec le style attraché.
       * Fonction utile pour l'export!
       * @returns {string}
       */
      this.toString = function() {
        var self = this;
        var div = document.createElement('div');

        if (self.type === 'divider') {
          if (self.attributes.metaStyle) {
            angular.element(div).css(self.attributes.metaStyle);
          }
        } else {
          // Crée un container dans lequel on va pouvoir rechercher nos tags
          div.innerHTML = self.content.html;

          for (var tag in self.style) {
            if (self.style.hasOwnProperty(tag)) {
              var item = angular.element(div).find(tag);
              item.css(self.style[tag]);
            }
          }
        }
        return div.innerHTML;
      }
    };
  })
  // Modèle héritant de Block, correspondant aux block double, ayant une behaviour un peu plus spéciale.
  .factory('BlockDouble', function($compile, $rootScope, Block, FileManager) {
    /**
     * Renvoie la taille des deux blocs en fonction d'un type passé en param.
     * @param patternSize
     * @returns []
     */
    function tableSize(patternSize) {
      var cssRuleToFirstCell;
      var cssRuleToSecondCell;

      var oneThird = '200px';
      var twoThird = '600px';
      var middle = '400px';

      /* on peut définir plusieurs types de width :
       * bloc 50/50, 400px - 400px.
       * bloc 1/3 - 2/3, 200px - 400px.
       * bloc 2/3 - 1/3, 400px - 200px.
       * */
      switch (patternSize) {
        case 'oneThird':
          cssRuleToFirstCell = oneThird;
          cssRuleToSecondCell = twoThird;
          break;
        case 'twoThird':
          cssRuleToFirstCell = twoThird;
          cssRuleToSecondCell = oneThird;
          break;
        case 'half':
          cssRuleToFirstCell = middle;
          cssRuleToSecondCell = middle;
          break;
        default:
          cssRuleToFirstCell = middle;
          cssRuleToSecondCell = middle;
          break;
      }

      return ['width:' + cssRuleToFirstCell, 'width:' + cssRuleToSecondCell];

    }

    BlockDouble.prototype = Object.create(Block.prototype);
    BlockDouble.prototype.constructor = Block;

    /**
     * Même que chose que pour le toString() des block simples,
     * seulemeent
     * @returns {*[]}
     */
    BlockDouble.prototype.toStringDouble = function() {
      var self = this;

    };

    /**
     * Fabrique de noeud vide html
     * @param rules
     * @param content
     * @returns {string}
     * @constructor
     */
    BlockDouble.prototype.createCells = function(rules, content) {
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

      /**
       * Renvoie un certain HTML en fonction du type.
       * @param contentType
       * @returns {*}
       */
      function getHtml(contentType) {
        var type;
        if (contentType === 'text') {
          type = '<p>Texte</p>';
        } else if (contentType === 'file') {
          type = '<p>Fichier</p>';
        } else if (contentType === 'social') {
          // Je récupère juste l'attribut img dans le tableau getSocial
          // et je les concatène pour faire une string
          type = FileManager.getSocialImages().map(function(social) {
            return social.img;
          }).join('')
        }
        return type;
      }

      if (content[0] === 'footer') {
        this.cells.push(new Block(getHtml('text'), getType('text')));
        this.cells.push(new Block(getHtml('social'), 'social'));
      } else {
        this.cells.push(new Block(getHtml(content[0]), getType(content[0])));
        this.cells.push(new Block(getHtml(content[1]), getType(content[1])));
      }

    };

    /**
     * Object blockDouble héritant de Block.
     * Prend en attribut du constructeur, le type de block double qui va être crée
     * - text-text / file-text / text-file.
     * @param type
     * @constructor
     */
    function BlockDouble(type) {
      if (!type) { throw 'Type undefined, lors de la création d\'un BlockDouble'; }
      this.cells = [];

      // Je crée un block de type double,
      // qui va contenir deux cellules, avec un type différent
      // et une taille différente, en fonction du layout
      Block.call(this,
        this.createCells(tableSize('half'), type.split('-')),
        'double'
      );
    }

    return BlockDouble;
  });

/**
 * Le principal model de l'application
 * @param content
 * @param type
 * @param nbColumns
 */
function block(content, type, nbColumns) {
  this.cells = [];

  this.content = {
    html:content
  };

  this.attributes = {
    // Le style sur le block en lui même
    metaStyle:{}
  };
  // Le style pour le contenu du block
  this.contentStyle = {};
  this.type = type;
  this.id = Math.random().toString(36).slice(2);

  /**
   * Setter de l'attribut style.
   * Si un attribut style existe déjà,
   * on append les nouveaux style à celui-ci.
   * @param style
   * @param node
   */
  this.setStyle = function(style, node) {
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
  };

  /**
   * Mets à jour le html
   * @param html
   */
  this.setHtml = function(html) {
    this.content.html = html;
  };

  /**
   * Mets à jour le type
   * @param type
   */
  this.setType = function(type) {
    this.type = type;
  };

  /**
   * A partir d'un autre objet block
   * Modifie les attributs de celui passé en paramètre.
   * @param html
   * @param type
   */
  this.update = function(html, type) {
    this.setHtml(html);
    this.setType(type);
  };

  /**
   * Retourne, le contenu html avec le style attraché.
   * Fonction utile pour l'export!
   * Les styles des block doubles sont stockés dans l'objet parent
   * et non dans chaque cellule, ainsi je suis obligé de boucler
   * les styles parents en plus de toutes les cells.
   * @returns {mixed}
   */
  this.toString = function() {
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
        strings.push({html:div.innerHTML, width: obj.style.td ? obj.style.td.width : '50%'});
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
  };


}
