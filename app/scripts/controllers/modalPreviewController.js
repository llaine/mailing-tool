'use strict';

// Le template correspondant se trouve dans settingsPanel.html
angular.module('newsletterEditorApp')
  .controller('ModalPreviewCtrl', function($scope, $modalInstance, BlocksModel, backgroundColor, borderType, DomManipulator) {
    var previewBlocksArray = [];
    $scope.style = {
      table:{
        border:borderType,
        width:'100%',
        tableLayout: 'fixed'
      },
      background:{
        background:backgroundColor
      },
      td: {
        background:'#FFF',
        padding: '15px',
        width:'100%'
      }
    };

    BlocksModel.map(function(block, index) {
      var previewBlock;
      if (block.type === "double" || block.type === "footer") {
        var table = DomManipulator.createTable(block.toStringDouble());
        previewBlock = {
          content:table.outerHTML,
          type:block.type,
          attributes: block.attributes
        };
      } else {
        previewBlock = {
          content:block.toString(),
          type:block.type,
          attributes: block.attributes
        };
      }
      previewBlocksArray.push(previewBlock);
    });

    $scope.preview = previewBlocksArray;

    /**
     * Ferme la modale
     */
    $scope.exit = function() {
      $modalInstance.close();
    };
  });
