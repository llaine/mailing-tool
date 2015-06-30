'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.BlocksManipulator
 * @description
 * # BlocksManipulator
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('BlocksManipulator', ['Blocks', function(Blocks) {

    /**
     * Helper qui permet de retourner le type d'un block.
     * @param el
     * @returns {*|string|string}
     */
    function getTypeOfBlock(el) { return el && $(el).data('type'); }

    /**
     * Récupère la position d'un block.
     * @param el
     */
    function getPositionOfBlock(el) {
      /* le span étant contenu dans un TD, on va au noeud parent récupérer l'attr */
      if (el.tagName === 'SPAN') {
        return $(el.parentNode).data('position');
      } else if (el.tagName === 'TD') {
        return $(el).data('position');
      }
    }

    /**
     * Fonction qui va faire le lien entre le changement d'état d'un block sur la vue
     * et dans le modèle
     * @param src
     * @param target
     * @param cb
     */
    function moveBlockToEditor(src, target, cb) {
      var type = getTypeOfBlock(src);
      var position = getPositionOfBlock(target);

      cb(true);
      // TODO
    }

    /**
     * Fonction qui va répercuter le changement de position d'un block sur la vue
     * dans le modèle
     * @param src
     * @param target
     * @param cb
     */
    function changeBlockPos(src, target, cb) {
      // TODO
    }

    /**
     * Fonction qui va répercuter le changement de d'une vue sur le modèle.
     * @param element
     * @param cb
     */
    function editBlock(element, cb) {
      // TODO à l'evt double click ou sur un bouton
    }

    /**
     * Va répercuter le suppression d'un block sur la vue dans le modèle.
     * @param element
     * @param cb
     */
    function deleteBlock(element, cb) {
      // TODO
    }

    return {
      moveBlockToEditor:moveBlockToEditor,
      changeBlockPos:changeBlockPos,
      editBlock:editBlock,
      deleteBlock:deleteBlock
    };

  }]);
