angular.module('newsletterEditorApp')
  .controller('SettingsPanelCtrl',
    function($rootScope, $scope, EventEmiter, BlocksManager, BlockFactory, Restangular) {
    var vm = this;
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
     * Supprime la classe active sur le block courant.
     */
    function removeClassFromBlock() {
      if (currentBlock) {
        currentBlock.removeClass('active');
      }
    }
    /**
     * Lorsqu'on clique sur le bouton de sauvegarde.
     */
    vm.saveAndClose = function() {
      $scope.modeEdition = false;
      removeClassFromBlock();
      EventEmiter.emit('panel:closed', true);
      displayContentTab();
    };

    /**
     * Ajoute un block au model.
     */
    vm.addBlock = function() {
      $scope.blocks.push(bf.create({type:'text'}));
    };

    /**
     * Exporte les données.
     */
    vm.send = function() {
      console.log(vm.blocks);
    };

    EventEmiter.on('edition:toggled', function(event, values) {
      /* On ne peut modifier qu'un seul block à la fois.
       * Donc si la modif était déjà active sur un autre, on supprime. */
      removeClassFromBlock();

      $scope.modeEdition = true;
      currentBlock = values.tr;
      currentBlock.addClass('active');
      vm.currentBlock = values.block;

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
      });
    }
  });