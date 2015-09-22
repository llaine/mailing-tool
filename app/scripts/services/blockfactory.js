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
          /**
           * Récupère le type de proto à instancier en
           * fonction du type de block.
           * @param type
           */
          function getType(type) {
            switch (type) {
              case 'text':
                return BlockSimple;
              case 'file':
                return BlockFile;
              case 'divider':
                return BlockDivider;
              case 'unsub':
                return BlockAction;
              case 'online':
                return BlockAction;
              case 'button':
                return BlockAction;
              case 'social':
                return BlockMulti;
              case 'double':
                return BlockMulti;
              default:
                return null;
            }
          }

          var parent = getType(opts.type);

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
        this.metaStyle = opts.metaStyle || {};
        this.contentStyle = opts.contentStyle || {};
        this.position = opts.position;
        this.type = opts.type;
        this.content = opts.content || generateContent(opts.type, opts.content, opts.isDrop);
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
        this.metaStyle = opts.metaStyle || {};
        this.contentStyle = opts.contentStyle || {};
        this.position = opts.position;
        this.type = opts.type;
        this.toString = toStringDouble;
        this.setStyle = setStyle;
        this.cells = opts.cells || generateSubBlocks(opts.nbColumns, opts.order);
      }

      /**
       * Block de type action,
       * tout les liens/button
       * @param opts
       * @constructor
       */
      function BlockAction(opts) {
        this.id = Math.random().toString(36).slice(2);
        this.metaStyle = opts.metaStyle || {};
        this.contentStyle = opts.contentStyle || {};
        this.attributes = opts.attributes || {btn:{}, link:{}};
        this.position = opts.position;
        this.type = opts.type;
        this.content = opts.content || generateContent(opts.type, opts.content, opts.isDrop);
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
        this.metaStyle = opts.metaStyle || {};
        this.contentStyle = opts.contentStyle || {};
        this.attributes = opts.attributes || {};
        this.position = opts.position;
        this.type = opts.type;
        this.content = opts.content || generateContent(opts.type, opts.content, opts.isDrop);
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
        var self = this;
        node = node.toLowerCase();

        if (self.contentStyle[node]) {
          for (var props in style) {
            if (style.hasOwnProperty(props)) {
              self.contentStyle[node][props] = style[props];
            }
          }
        } else {
          self.contentStyle[node] = style;
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
          cells.push(new prototype({type:typeArray[i], position:i}));
        }

        return cells;
      }

      /**
       * En fonction du type génère le contenu par défaut
       * @param type
       * @param content
       * @param isDrop
       * @returns {string}
       */
      function generateContent(type, content, isDrop) {
        if (content) { return content; }
        switch (type) {
          case 'text':
            return isDrop ? '<p>Saisissez votre texte</p>' : '<p>Glisser ici un type de bloc</p>';
          case 'file':
            return isDrop ? '<p>Sélectionner votre image</p>' :'<p>Fichier</p>';
          case 'unsub':
            return '<a rel="unsubscribe">Unsubscribe</a>';
          case 'online':
            return '<a rel="online">Lien vers l\'affichage en ligne</a>';
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

          for (var tag in self.contentStyle) {
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

        for (var i = 0; i < self.cells.length; i++) {
          var obj = self.cells[i];
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
