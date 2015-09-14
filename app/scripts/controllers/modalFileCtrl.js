'use strict';

angular.module('newsletterEditorApp')
  .controller('UploadImageCtrl', function() {
    console.log('toto');
  })
  .controller('ModalFileManagerCtrl', function($scope, $modalInstance, CurrentBlock, AviaryEditor, FileManager) {
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
      var randomId = image.id;
      var imgWithoutLink = '<img id="' + randomId + '" src="' + image.url + '" class="img-rounded"/>';
      var imgWithLink = CurrentBlock.attributes.link ? '<a target="_blank" href="' + encodeURI(CurrentBlock.attributes.link) + '">' + imgWithoutLink + '</a>' : imgWithoutLink;

      CurrentBlock.attributes = {
        id: randomId,
        url: image.url,
        link:CurrentBlock.attributes.link
      };

      CurrentBlock.content = imgWithLink;
      $modalInstance.close();
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