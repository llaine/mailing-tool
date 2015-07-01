'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.BlocksManipulator
 * @description
 * # BlocksManipulator
 * Service in the newsletterEditorApp.
 * Permet d'avoir le modèle et la vue dans un état similaire et cohérent.
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
    function createBlockToEditor(src, target, cb) {
      var type = getTypeOfBlock(src);
      var position = getPositionOfBlock(target);

      /* retourne l'objet nouvelement créer */
      return Blocks.push({type:type, position:position});
    }

    /**
     * Mets à jour le contenu de l'object el
     */
    function updateContentFromBlock(el) {
      Blocks.updateContent(el.position, el.content);
      $('tr')
        .find('[data-position="' + el.position + '"]')
        .children('span')
        .html(el.content.html);
    }

    /**
     * Fonction qui va répercuter le changement de position d'un block sur la vue
     * dans le modèle
     * @param src
     * @param target
     */
    function changeBlockPos(src, target) {
      Blocks.update(src, target);
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

    /**
     * Récupère un block spécifique.
     * @param index
     * @returns {*}
     */
    function getBlock(index) {
      return Blocks.get(index);
    }


    return {
      getPosition:getPositionOfBlock,
      getBlock:getBlock,
      createBlockToEditor:createBlockToEditor,
      changeBlockPos:changeBlockPos,
      editBlock:editBlock,
      deleteBlock:deleteBlock,
      updateContent:updateContentFromBlock
    };

  }]);
