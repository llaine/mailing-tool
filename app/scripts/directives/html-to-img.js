'use strict';

angular.module('newsletterEditorApp')
  .directive('htmlToImg', function($window) {
    return {
      scope: {
        html: '@'
      },
      template: '<img/>',
      link: {
        /**
         * Fonction pre de la directive
         * @param scope
         * @param element
         * @param attrs
         */
        pre: function(scope, element, attrs) {
          //Utilisation d'une iframe, pour récupérer les élements du DOM
          var iframe = document.createElement('iframe');
          document.body.appendChild(iframe);
          var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
          iframedoc.body.innerHTML = scope.html;
          // Cette fonction va transformer l'iframe en canvas (picture).
          $window.html2canvas(iframedoc.body, {
            /**
             * Lorsque le canvas se render
             * @param canvas
             */
            onrendered: function(canvas) {
              document.body.removeChild(iframe);
              element.html('<img width=200 height=110 src="' + canvas.toDataURL() + '"/>');
            }
          });
        }
      }
    };
  });