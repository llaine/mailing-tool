'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.GlobalStyles
 * @description
 * # GlobalStyles
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('GlobalStyles', function() {
    return {
      getFonts:getFonts,
      getTitleSize:getTitleSize,
      getParagraphSize:getParagraphSize,
      getLayoutForBlockDouble:getLayoutForBlockDouble,
      getDefaultParams:getDefaultParams,
      getMarginTypes:getMarginTypes,
      getMarginSize:getMarginSize,
      getDefaultButtonParams:getDefaultButtonParams
    };

    /**
     * Les tailles des marges
     * @returns Array
     */
    function getMarginSize() {
      return [
        {size:'1px'},
        {size:'2px'},
        {size:'4px'},
        {size:'6px'},
        {size:'8px'}
      ];
    }
    /**
     * Les types de marges.
     * @returns Array
     */
    function getMarginTypes() {
      return [
        {type:'dotted', text:'.....'},
        {type:'dashed', text:'-----'},
        {type:'solid', text:'______'}
      ];
    }
    /**
     * Récupère les fonts qu'on peut mettre sur
     * l'éditeur
     */
    function getFonts() {
      return [
        {text:'Times New Roman'},
        {text:'Arial'},
        {text:'Helvetica'},
        {text:'Lucida'},
        {text:'Gill Sans Extrabold'},
        {text:'Courier'},
        {text:'Times'},
        {text:'Verdana'},
        {text:'Lucida Console'}
      ];
    }

    /**
    * Récupère les tailles des titres qu'on peut mettre sur l'éditeur
    */
    function getTitleSize() {
      return [
        {size:'30px'},
        {size:'32px'},
        {size:'34px'},
        {size:'36px'}
      ];
    }

    /**
    * Récupère les tailles des parapgraph qu'on peut
     * appliquer en style à l'éditeur.
    */
    function getParagraphSize() {
      return [
        {size:'10px'},
        {size:'12px'},
        {size:'14px'},
        {size:'16px'}
      ];
    }

    /**
     * Layout qu'on peut appliquer sur les blocks double (les tables)
     */
    function getLayoutForBlockDouble(isDouble) {
      if (isDouble) {
        return [
          {layout:'1/4', value:'25-75'},
          {layout:'1/3', value:'37.5-75'}
        ];
      } else {
        return [
          {layout:'1/4', value:'25-75'},
          {layout:'1/3', value:'37.5-75'},
          {layout:'1/2', value:'50-50'},
          {layout:'2/3', value:'75-50'},
          {layout:'3/4', value:'75-25'}
        ];
      }
    }

    /**
     * Paramètres par défaut des block de type button
     * @returns {{link: string, txt: string, height: number, width: number, bords: string, dispo: string, bgColor: string}}
     */
    function getDefaultButtonParams() {
      return {
        link:'http://example.com',
        txt:'Cliquez ici !',
        height:32,
        width:96,
        bords:'5px',
        dispo:'left',
        bgColor:'#F2F2F2'
      };
    }

    /**
     * Default params
     * @returns {{title: {color: string, fontSize: string, fontFamily: string, fontWeight: string, lineHeight: string}, paragraph: {color: string, fontSize: string, fontFamily: string}, link: {color: string, fontSize: string, fontFamily: string}, background: {bgColor: string, borderSize: string, borderType: string, borderColor: string}, layout: {blockDouble: {layout: string, value: string}, images: {margin: {left: number, top: number, right: number, bottom: number}, width: number}}}}
     */
    function getDefaultParams() {
      return {
        title: {
          color: '#00000',
          fontSize: 30 + 'px',
          fontFamily: 'Arial',
          fontWeight: 'normal',
          lineHeight: '1'
        },
        paragraph: {
          color: '#00000',
          fontSize: 12 + 'px',
          fontFamily: 'Arial'
        },
        link: {
          color: '#00000',
          fontSize: 12 + 'px',
          fontFamily: 'Arial'
        },
        background: {
          // La couleur de fond de l'email
          bgColor: '#FFFFF',
          // La bordure autour de l'email
          borderSize: '1px',
          borderType: 'solid',
          borderColor: 'black'
        },
        layout: {
          blockDouble: {layout: '1/2', value: '400-400'},
          images: {
            margin: {
              left: 1,
              top: 1,
              right: 1,
              bottom: 1
            },
            width: 140
          }
        },
        button: {
          height:32,
          width:96,
          bords:'5px',
          dispo:'left',
          backgroundColor:'#F2F2F2',
          link:'http://example.com',
          txt:'Cliquze ici!'
        }
      };
    }

  });
