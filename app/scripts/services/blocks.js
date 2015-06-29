'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.Blocks
 * @description
 * # Blocks
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('Blocks', function() {
    var blockStack = [];

    /**
     * Ajoute un block à la liste des blocs
     */
    function append(el) {
      if (blockStack.length < 5) {
        blockStack.push({
          type:el,
          position:blockStack.length + 1,
          added: new Date().getTime()
        });
      }
    }

    /**
     * Retourne tout les objets courant sur la board.
     * @returns {Array}
     */
    function getBlocks() {
      return blockStack;
    }

    /**
     * zef
     */
    function remove() {

    }

    /**
     * Bouge un élement sur l'éditeur, d'une position vers
     * une autre.
     * @param el
     * @param direction
     */
    function move(el, direction) {
      /* récupération de l'index de l'élement */
      var index = blockStack.map(function(b) { return b.added; }).indexOf(el.added);

      /* modification en fonction de la direction */
      switch (direction) {
        case 'up':
          if (blockStack[index].position < blockStack[index].length) {
            blockStack[index - 1].position--;
            blockStack[index].position++;
          }
          break;
        case 'down':
          if (blockStack[index].position > 0) {
            blockStack[index + 1].position++;
            blockStack[index].position--;
          }
      }

      return blockStack;
    }

    return {
      move:move,
      append:append,
      remove:remove,
      getAll:getBlocks
    };

  });
