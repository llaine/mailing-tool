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
        {text:'Arial'},
        {text:'Courier New'},
        {text:'Times New Roman'}
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
        {size:'8px'},
        {size:'10px'},
        {size:'12px'},
        {size:'14px'},
        {size:'16px'},
        {size:'18px'}
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
     * Setup des paramètres par défaut.
     * En fonction du block courant ou alors, des params par défaut.
     * @param block
     * @returns {{title: {}, paragraph: {}, a: {}, layout: {blockDouble: {layout: string, value: string}, images: {}}, images2: {}, images1: {}, background: {bgColor: string, borderSize: string, borderType: string, borderColor: string}, button: {height: number, width: number, bords: string, dispo: string, backgroundColor: string, link: string, txt: string}}}
     */
    function getDefaultParams(block) {
      var defaultStyle = {
        title: {},
        paragraph: {},
        a:{},
        layout:{
          blockDouble: {layout: '1/2', value: '400-400'},
          images:{}
        },
        images2:{},
        images1:{},
        background: {
          // La couleur de fond de l'email
          bgColor: '#FFFFFF',
          // La bordure autour de l'email
          borderSize: '1px',
          borderType: 'solid',
          borderColor: 'black'
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
      // Les titres
      if (block.contentStyle.h1) {
        var h1 = block.contentStyle.h1;
        defaultStyle.title = {
          color: h1.color || '#000000',
          fontSize:  h1['font-size'] || 30 + 'px',
          fontFamily: h1['font-family'] || 'Arial',
          fontWeight: h1['font-weight'] || 'normal',
          lineHeight: h1['line-weight'] || '1'
        };
      } else {
        defaultStyle.title = {
          color:'#00000',
          fontSize: 30 + 'px',
          fontFamily: 'Arial',
          fontWeight: 'normal',
          lineHeight: '1'
        };
      }

      if (block.contentStyle.p) {
        var p = block.contentStyle.p;
        defaultStyle.paragraph = {
          color: p.color || '#000000',
          fontSize:  p['font-size'] || 12 + 'px',
          fontFamily: p['font-family'] || 'Arial',
          lineHeight: p['line-weight'] || '1'
        };
      } else {
        defaultStyle.paragraph = {
          color: '#00000',
          fontSize: 12 + 'px',
          fontFamily: 'Arial',
          lineHeight: '1'
        };
      }

      if (block.contentStyle.a) {
        var a = block.contentStyle.a;
        defaultStyle.link = {
          color: a.color || '#000000',
          fontSize:  a['font-size'] || 12 + 'px',
          fontFamily: a['font-family'] || 'Arial'
        };
      } else {
        defaultStyle.link = {
          color: '#00000',
          fontSize: 12 + 'px',
          fontFamily: 'Arial'
        };
      }

      /*margin-left: "26%"
       margin-top: "0%"
       width: "233px"*/

      if (block.contentStyle.img) {
        var img = block.contentStyle.img;
        defaultStyle.layout.images = {
          margin: {
            left: parseInt(img['margin-left']) || 0,
            top: parseInt(img['margin-top']) || 0
          },
          width: parseInt(img.width) || 240
        };
      } else {
        defaultStyle.layout.images = {
          margin: {
            left: 0,
            top: 0
          },
          width: 240
        };
      }

      // Les images doubles.
      if (block.type === 'double' && block.cells[0].contentStyle.img) {
        var img1 = block.cells[0].contentStyle.img;
        defaultStyle.image1 = {
          margin: {
            left: parseInt(img1['margin-left']) || 0,
            top: parseInt(img1['margin-top']) || 0
          },
          width: parseInt(img1.width) || 240
        };
      } else {
        defaultStyle.image1 = {
          margin: {
            left: 0,
            top: 0
          },
          width: 240
        };
      }

      if (block.type === 'double' && block.cells[1].contentStyle.img) {
        var img2 = block.cells[1].contentStyle.img;
        defaultStyle.image2 = {
          margin: {
            left: parseInt(img2['margin-left']) || 0,
            top: parseInt(img2['margin-top']) || 0
          },
          width: parseInt(img2.width) || 240
        };
      } else {
        defaultStyle.image2 = {
          margin: {
            left: 0,
            top: 0
          },
          width: 240
        };
      }

      return defaultStyle;
    }
  });
