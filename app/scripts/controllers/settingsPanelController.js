angular.module('newsletterEditorApp')
  .controller('SettingsPanelCtrl',
    function($rootScope, $scope, $routeParams,
             EventEmiter, BlocksManager, BlockFactory, Restangular, DraggableHelper) {
    var vm = this;
    var currentBlock;
    $scope.modeEdition = false;
    var bf = new BlockFactory();

    getIconsForBlocks();

    /**
     * Affiche le contenu de la tab "choose content"
     */
    function displayContentTab() {
      $('.btn-group:eq(0)').tab('show');
      $('#btnBlockChoices').siblings().removeClass('active').addClass('active');
    }

    /**
     * Supprime la classe active sur le block courant.
     */
    function removeClassFromBlock() {
      if (currentBlock) {
        currentBlock.closest('.rowToBeActive').removeClass('active');
      }
    }

    function addClassActiveToRow() {
      // rowToBeActive
      currentBlock.closest('.rowToBeActive').addClass('active');
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
      // Scroll automatique au bottom
      DraggableHelper.scrollToBottom();
    };

    /**
     * Mets à jour ou sauvegarde le template
     */
    vm.save = function() {
      if ($routeParams.fromTemplate) {
        Restangular.one('template', $routeParams.fromTemplate).patch($scope.blocks)
            .then(function(template) {
              // TODO
              alert('Template bien mit à jour!')
            });
      } else {
        Restangular.all('template').post($scope.blocks)
            .then(function(template) {
              // TODO, reload avec le fromTemplate=numero
              // ou numero est égal au numéro de template crée.
              alert('Template bien sauvegardé')
            });
      }
    };

    /**
     * Exporte les données.
     */
    vm.send = function() {
      console.log(vm.blocks);
    };

    EventEmiter.onEvent($scope, 'edition:toggled', function(event, values) {
      removeClassFromBlock();

      $scope.modeEdition = true;
      currentBlock = values.tr;
      vm.currentBlock = values.block;
      addClassActiveToRow();
      displayContentTab();

      $rootScope.safeApply();
    });

    //EventEmiter.on('edition:toggled', function(event, values) {
    //  /* On ne peut modifier qu'un seul block à la fois.
    //   * Donc si la modif était déjà active sur un autre, on supprime. */
    //  removeClassFromBlock();
    //
    //  $scope.modeEdition = true;
    //  currentBlock = values.tr;
    //  currentBlock.addClass('active');
    //  vm.currentBlock = values.block;
    //
    //  $rootScope.safeApply();
    //
    //  displayContentTab();
    //});

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