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
     * Assigne une position d'un block dans la pile.
     * @param el
     * @returns {*}
     */
    function push(el) {
      if (el) {

        /* le modèle est constitué d'objet contenant les attributs suivants */
        var newElement = {
          position: el.position,
          content: {
            type:el.type, // Le type de l'élement (file/texte, etc)
            _id: new Date().getTime(),
            html:'' // Le contenu
          }
        };

        blockStack.push(newElement);

        return newElement;
      }
    }

    /**
     * Renvoie un élement spécifique de la pile.
     * @param position
     * @returns {*}
     */
    function get(position) {

      var indexOf = blockStack.map(function(b) {
        return b.position;
      }).indexOf(position);

      return blockStack[indexOf];
    }

    /**
     * Retourne toute la stack.
     * @returns {Array}
     */
    function getAll() {
      return blockStack;
    }

    /**
     * MEts à jour l'élement à la position, position vers la nouvelle position.
     * Sans oublier de swaper l'autre élement du tableau.
     * @param position
     * @param newPosition
     */
    function update(position, newPosition) {
      if (blockStack.length <= 0) {
        throw new Error('Impossible de mettre à jours sur une pile vide.');
      }

      var oldIndex;
      var newIndex;

      /* récupère l'objet qui est à l'index  */
      $.each(blockStack, function(index) {
        if (this.position === newPosition) {
          oldIndex = index;
        }

        if (this.position === position) {
          newIndex = index;
        }
      });

      /* swap basique des deux élements du tableau. */
      var temp = blockStack[newIndex];
      temp.position = newPosition;

      blockStack[newIndex] = blockStack[oldIndex];
      blockStack[newIndex].position = position;

      blockStack[oldIndex] = temp;
    }

    return {
      getAll:getAll,
      push:push,
      get:get,
      update:update
    };
  });
