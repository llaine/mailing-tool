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
       * Supprime la classe active sur le block courant.
       */
      function removeClassFromBlock() {
        if (currentBlock) {
          currentBlock.closest('.rowToBeActive').removeClass('active');
        }
      }

      /**
       * Ajout la classe active sur la colonne en cours d'édition
       */
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
                window.alert('Template bien mit à jour!')
              });
        } else {
          Restangular.all('template').post($scope.blocks)
              .then(function(template) {
                // TODO, reload avec le fromTemplate=numero
                // ou numero est égal au numéro de template crée.
                window.alert('Template bien sauvegardé')
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

        $rootScope.safeApply();

        // On affiche la liste des blocks.
        $('#tabs a[href="#list"]').tab('show');
        $('a[href="#list"]').addClass('active').siblings().removeClass('active');
      });

      EventEmiter.on('panel:closed', function() {
        $('#tabs a[href="#list"]').tab('show');
        $('a[href="#list"]').addClass('active').siblings().removeClass('active');
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
