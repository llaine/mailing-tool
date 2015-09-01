'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.BlocksManager
 * @description
 * # BlocksManager
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('BlocksManager', function(Block, Restangular) {
    var blockStack = [];

    /**
     * Renvoie un élement spécifique de la pile.
     * @param index
     * @returns {*}
     */
    this.get = function(index) {
      return blockStack[index];
    }

    /**
     * Retourne toute la stack.
     * @returns {Array}]
     */
    this.getAll = function() {
      return blockStack;
    }

    /**
     * Mets à jour le contenu d'un élement à l'index donné.
     * @param index
     * @param content
     */
    this.updateContent = function(index, content) {
      blockStack[index].content = content;
    }

    /**
     * Set model
     * @param stack
     */
    this.setModel = function(stack) {
      blockStack = stack;
    }

    /**
     * Renvoie les icones pour le type de block
     * @param type
     * @returns {*}
     */
    this.getIconsForType = function(type) {
      switch(type) {
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
    }

    Restangular.one('template', 0).get().then(function(data) {
      angular.forEach(data.blocks, function(item) {
        blockStack.push(new Block(item.type, item.content, item.columns));
      });
    });
  });
