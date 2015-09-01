'use strict';

/**
 * @ngdoc filter
 * @name newsletterEditorApp.filter:stylish
 * @function
 * @description
 * # stylish
 * Filter in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .filter('stylish', function() {
    return function(input, block) {
      var parser = new DOMParser();
      var output = parser.parseFromString(input, 'text/xml').firstChild;
      var node = $(output);
      var styleKeys = Object.keys(block.style);

      if (styleKeys.indexOf(output.tagName) !== -1) {
        var styleForTag = block.style[output.tagName];
        node.css(styleForTag);
        console.log(node.innerHTML);
      }

      return input;
      //console.log(block);
      //return 'stylish filter: ' + input;
    };
  });
