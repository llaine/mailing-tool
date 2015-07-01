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
    var blockStack = [
      {position:1, content:{}},
      {position:2, content:{}},
      {position:3, content:{}},
      {position:4, content:{}},
      {position:5, content:{}}
    ];

    /**
     * Assigne une position d'un block dans la pile.
     * @param el
     * @returns {*}
     */
    function push(el) {
      if (el) {

        var index = el.position - 1;

        /* le modèle est constitué d'objet contenant les attributs suivants */
        var newElement = {
          position: el.position,
          content: {
            type:el.type, // Le type de l'élement (file/texte, etc)
            _id: new Date().getTime(),
            html:'' // Le contenu
          }
        };

        blockStack[index] = newElement;

        return newElement;
      }
    }

    /**
     * Renvoie un élement spécifique de la pile.
     * @param index
     * @returns {*}
     */
    function get(index) {
      return blockStack[index];
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
    function updatePosition(position, newPosition) {
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
      swapItems(oldIndex, newIndex);
    }

    /**
     *
     * @param firstIndex
     * @param secondIndex
     */
    function swapItems(firstIndex, secondIndex) {
      var firstPosition = firstIndex + 1;
      var secondPosition = secondIndex + 1;

      var temp = blockStack[firstIndex];
      temp.position = secondPosition;

      blockStack[firstIndex] = blockStack[secondIndex];
      blockStack[firstIndex].position = firstPosition;

      blockStack[secondIndex] = temp;
    }

    /**
     * Mets à jour le contenu d'un élement à une position
     * @param position
     */
    function updateContent(position, content) {
      var index = position - 1;
      blockStack[index].content = content;
    }
    return {
      getAll:getAll,
      push:push,
      get:get,
      update:updatePosition,
      updateContent:updateContent
    };
  });
