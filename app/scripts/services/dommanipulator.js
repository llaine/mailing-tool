'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.DomManipulator
 * @description
 * # DomManipulator
 * Service in the newsletterEditorApp.
 * Pour éviter d'utiliser jQuery, wrappe les fonctions de manipulation du DOM
 * dans ce service, se basant sur du VanillaJS
 */
angular.module('newsletterEditorApp')
  .service('DomManipulator', function() {
    var self = this;

    /**
     * Créer un node HTML
     * @param element
     * @returns {Element}
     */
    self.createElement = function(element) {
      return document.createElement(element);
    };

    /**
     * Récupère le style d'un node HTML
     * @param node
     * @param attribute
     * @returns {string}
     */
    self.getStyleAttribute = function(node, attribute) {
      var style = window.getComputedStyle(node); // .getPropertyValue('background');
      return style.getPropertyValue(attribute);
    };

    /**
     * A partir d'un tableau de ligne (contenant des colonnes avec le contenu + le style)
     * Créer une table HTML, représentant ce tableau
     * @param rows
     * @returns {Element}
     */
    self.createTable = function(rows) {
      var table = self.createElement('table');
      table.style.width = '100%';
      table.style.tableLayout = 'fixed';

      for (var i = 0 ; i < rows.length; ++i) {
        var tr = self.createElement('tr');
        for (var j = 0 ; j < rows[i].length ; ++j) {
          var td = self.createElement('td');
          td.innerHTML = rows[i][j].html;
          td.style.width = rows[i][j].width;
          td.style.wordWrap = 'break-word';

          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      return table;
    };

    /**
    *
    * @param href
    * @param content
    * @returns {string}
    */
    self.createStringLink = function(href, content) {
      return '<a target="_blank" href="' + encodeURI(href) + '">' + content + '</a>';
    };

    /**
     *
     * @param id
     * @param src
     * @returns {string}
     */
    self.createStringImg = function(id, src) {
      return '<img class="img-rounded" id="' + id + '" src="' + src + '" />';
    };
  });
