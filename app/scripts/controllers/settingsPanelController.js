angular.module('newsletterEditorApp')
  .controller('SettingsPanelCtrl', function($rootScope, $scope, EventEmiter, BlocksManager, BlockFactory, Restangular) {
    var currentBlock;
    $scope.modeEdition = false;
    var bf = new BlockFactory();

    getIconsForBlocks();

    /**
     * Affiche le contenu de la tab "choose content"
     */
    function displayContentTab() {
      $('.btn-group a[href="#list"]').tab('show');
    }

    /**
     * Lorsqu'on clique sur le bouton de sauvegarde.
     */
    $scope.saveAndClose = function() {
      $scope.modeEdition = false;
      currentBlock.removeClass('active');
      EventEmiter.emit('panel:closed', true);
      displayContentTab();
    };

    /**
     * Ajoute un block au model.
     */
    $scope.addBlock = function() {
      $scope.blocks.push(bf.create({type:'text'}));
    };


    /**
     * Exporte les données.
     */
    $scope.send = function() {
      console.log($scope.blocks);
    };

    /* toggle des tabs. */
    $('.btn-group a').click(function(e) {
      e.preventDefault();
      $(this).tab('show');

      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    });

    EventEmiter.on('edition:toggled', function(event, values) {
      /* On ne peut modifier qu'un seul block à la fois.
       * Donc si la modif était déjà active sur un autre, on supprime. */
      if (currentBlock) {
        currentBlock.removeClass('active');
      }

      $scope.modeEdition = true;
      currentBlock = values.tr;
      currentBlock.addClass('active');
      $scope.currentBlock = values.block;

      $rootScope.safeApply();

      displayContentTab();
    });

    EventEmiter.on('edition:closed', function() {
      $scope.saveAndClose();
    });

    /**
     * Appel l'api pour récupérer les types de block
     */
    function getIconsForBlocks() {
      Restangular.all('block-type').getList().then(function(data) {
        $scope.availableBlocks = data.map(function(item) {
          item.icons = BlocksManager.getIconsForType(item.type === 'double' ? item.order : item.type);
          return item;
        });
        console.log($scope.availableBlocks);

      });
    }
  });