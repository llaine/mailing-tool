'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.BlockHelper
 * @description
 * # BlockHelper
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
    .factory('BlockFactory', function(FileManager) {
      /**
       * Factory qui créer
       * un block en fonction du type.
       */
      return function BlockFactory() {
        /**
         * Fonction de création
         * @param opts
         */
        this.create = function(opts) {
          var parent = null;

          switch (opts.type) {
            case 'text':
              parent = BlockSimple;
              break;
            case 'file':
              parent = BlockFile;
              break;
            case 'divider':
              parent = BlockDivider;
              break;
            case 'unsub':
              parent = BlockAction;
              break;
            case 'online':
              parent = BlockAction;
              break;
            case 'button':
              parent = BlockAction;
              break;
            case 'social':
              parent = BlockMulti;
              break;
            case 'double':
              parent = BlockMulti;
              break;
          }

          if (parent === null) {
            throw 'Sous type indéfinie lors de la création du block';
          }

          return new parent(opts);
        };
      };

      /**
       * Le block + le plus simple sur l'éditeur.
       * Dispose d'une seule cellule.
       * @param opts
       * @constructor
       */
      function BlockSimple(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = {};
        this.contentStyle = {};
        this.type = opts.type;
        this.content = generateContent(opts.type, opts.content);
        this.toString = toString;
        this.setStyle = setStyle;
      }

      /**
       * Block plus complexe, comprenant n sous blocks.
       * @param opts
       * @constructor
       */
      function BlockMulti(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = {};
        this.contentStyle = {};
        this.order = opts.order;
        this.type = opts.type;
        this.toString = toStringDouble;
        this.setStyle = setStyle;
        this.cells = generateSubBlocks(opts.nbColumns, opts.order);
      }

      /**
       * Block de type action,
       * tout les liens/button
       * @param opts
       * @constructor
       */
      function BlockAction(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = {};
        this.contentStyle = {};
        this.attributes = {};
        this.type = opts.type;
        this.content = generateContent(opts.type, opts.content);
        this.toString = toString;
        this.setStyle = setStyle;
      }

      /**
       * Block de type fichier
       * @param opts
       * @constructor
       */
      function BlockFile(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = {};
        this.contentStyle = {};
        this.attributes = {};
        this.type = opts.type;
        this.content = generateContent(opts.type, opts.content);
        this.toString = toString;
        this.setStyle = setStyle;
      }

      /**
       * Block de type divider sur l'éditeur.
       * Assez spécial puisqu'il ne dispose pas de contenu
       *
       *
       * @param opts
       * @constructor
       */
      function BlockDivider(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = {};
        this.contentStyle = {};
        this.type = opts.type;
        this.toString = toString;
        this.setStyle = setStyle;
      }

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
       * Génère les sous block correspondant
       * @param nbColumns
       * @param order
       * @returns {Array}
       */
      function generateSubBlocks(nbColumns, order) {
        if (nbColumns < 2) { return []; }
        var cells = [];
        var typeArray = order.split('-');

        for (var i = 0; i < nbColumns; i++) {
          var prototype;
          switch (typeArray[i]) {
            case 'text':
              prototype = BlockSimple;
              break;
            case 'file':
              prototype = BlockFile;
              break;
            case 'unsub':
              prototype = BlockAction;
              break;
            case 'online':
              prototype = BlockAction;
              break;
            case 'button':
              prototype = BlockAction;
              break;
          }
          cells.push(new prototype({type:typeArray[i]}));
        }

        return cells;
      }

      /**
       * En fonction du type génère le contenu par défaut
       * @param type
       * @param content
       * @returns {string}
       */
      function generateContent(type, content) {
        if (content) { return content; }
        switch (type) {
          case 'text':
            return '<p>Contenu</p>';
          case 'file':
            return '<p>Fichier</p>';
          case 'unsub':
            return '<a rel="unsubscribe">Unsubscribe</a>';
          case 'online':
            return '<a rel="online">Voir la version en ligne</a>';
          case 'button':
            return '<button class="btn btn-default"><a href="#">Cliquez ici !</a></button>';
          case 'social':
            return FileManager
                .getSocialImages()
                .map(function(social) {
                  return social.img;
                })
                .join('');
        }
      }

      /**
       * Override de la méthode toString()
       * @returns {string}
       */
      function toString() {
        var self = this;
        var div = document.createElement('div');

        if (self.type === 'divider') {
          if (self.metaStyle) {
            angular.element(div).css(self.metaStyle);
          }
        } else {
          // Crée un container dans lequel on va pouvoir rechercher nos tags
          div.innerHTML = self.content;

          for (var tag in self.style) {
            if (self.contentStyle.hasOwnProperty(tag)) {
              var item = angular.element(div).find(tag);
              item.css(self.contentStyle[tag]);
            }
          }
        }
        return div.innerHTML;
      }

      /**
       * Override de la méthode toString()
       * @returns {*[]}
       */
      function toStringDouble() {
        var self = this;
        var strings = [];

        for (var i = 0; i < this.cells.length; i++) {
          var obj = this.cells[i];
          var div = document.createElement('div');
          div.innerHTML = obj.content;

          for (var tag in self.contentStyle) {
            if (self.contentStyle.hasOwnProperty(tag)) {
              var item = angular.element(div).find(tag);
              item.css(self.contentStyle[tag]);
            }
          }
          strings.push({html:div.innerHTML, width: obj.contentStyle.td ? obj.contentStyle.td.width : '50%'});
        }
        return [strings];
      }

    });
