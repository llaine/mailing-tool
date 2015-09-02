'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.BlocksManager
 * @description
 * # BlocksManager
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('BlocksManager', function($routeParams, Restangular, Block) {
    var blockStack = [];

    loadTemplate();

    /**
     * Renvoie un élement spécifique de la pile.
     * @param index
     * @returns {*}
     */
    this.get = function(index) {
      return blockStack[index];
    };

    /**
     * Retourne toute la stack.
     * @returns {Array}]
     */
    this.getAll = function() {
      return blockStack;
    };

    /**
     * Mets à jour le contenu d'un élement à l'index donné.
     * @param index
     * @param content
     */
    this.updateContent = function(index, content) {
      blockStack[index].content = content;
    };

    /**
     * Set model
     * @param stack
     */
    this.setModel = function(stack) {
      blockStack = stack;
    };

    /**
     * Renvoie les icones pour le type de block
     * @param type
     * @returns {*}
     */
    this.getIconsForType = function(type) {
      switch (type) {
        case 'text':
          return ['align-justify'];
        case 'file':
          return ['picture'];
        case 'divider':
          return ['minus'];
        case 'unsub':
          return ['remove-circle'];
        case 'text-file':
          return ['align-justify', 'picture'];
        case 'file-text':
          return ['picture', 'align-justify'];
        case 'text-text':
          return ['align-justify', 'align-justify'];
        case 'file-file':
          return ['picture', 'picture'];
        default:
          return ['question-sign'];
      }
    };

    /**
     * Charge le template en fonction du paramètrs dans l'url.
     */
    function loadTemplate() {
      if ($routeParams.fromTemplate) {
        Restangular.one('template', $routeParams.fromTemplate).get().then(function(data) {
          angular.forEach(data.blocks, function(item) {
            blockStack.push(
                new Block(item.content, item.type, item.columns)
            );
          });
        });
      } else {
        [1, 2, 3].forEach(function() {
          blockStack.push(new Block('Déposer votre contenu ici', 'text-text', 2));
        });
      }
    }
  });
