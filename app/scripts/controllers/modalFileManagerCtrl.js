'use strict';


angular.module('newsletterEditorApp')
  .controller('ModalFileManagerCtrl', function($scope, $modalInstance, CurrentBlock, CurrentLink, AviaryEditor, FileManager) {
    $scope.images = FileManager.getAll();

    /**
     *
     * @param image
     */
    $scope.modify = function(image) {
      AviaryEditor.launchEditor(image);
    };

    /**
     *
     * @param image
     */
    $scope.select = function(image) {
      var randomId = Math.random().toString(36).slice(2);
      var imgWithoutLink = '<img id="' + randomId + '" src="' + image.url + '" class="img-rounded"/>';
      var imgWithLink = CurrentLink ? '<a target="_blank" href="' + encodeURI(CurrentLink) + '">' + imgWithoutLink + '</a>' : imgWithoutLink;

      CurrentBlock.attributes = {
        id: randomId,
        url: image.url,
        link: CurrentLink
      };

      CurrentBlock.content = imgWithLink;
    };

    /**
     *
     */
    $scope.close = function() {
      $modalInstance.close();
    };

    /**
     *
     * @param order
     */
    $scope.setOrder = function(order) {
      $scope.order = order;
    };

  });