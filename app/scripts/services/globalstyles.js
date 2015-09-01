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
      getDefaultParams:getDefaultParams
    };

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
    function getLayoutForBlockDouble() {
      return [
        {layout:'One thrid', value:'37.5-75'},
        {layout:'Two Third', value:'75-50'},
        {layout:'Half', value:'50-50'},
        {layout:'One half', value:'25-75'},
        {layout:'Three half', value:'75-25'}
      ];
    }

    function getDefaultParams() {
      return {
        title: {
          color:'#00000',
          fontSize:30 + 'px',
          fontFamily:'Arial',
          fontWeight:'normal',
          lineHeight:'1'
        },
        paragraph: {
          color:'#00000',
          fontSize:12 + 'px',
          fontFamily:'Arial'
        },
        link: {
          color:'#00000',
          fontSize:12 + 'px',
          fontFamily:'Arial'
        },
        background: {
          // La couleur de fond de l'email
          bgColor:'#FFFFF',
          // La bordure autour de l'email
          borderSize:'1px',
          borderType:'solid',
          borderColor:'black'
        },
        layout: {
          blockDouble:{layout:'Half', value:'400-400'},
          images: {
            margin: {
              left:1,
              top:1,
              right:1,
              bottom:1
            },
            width:20
          }
        }
      };
    }

  });
