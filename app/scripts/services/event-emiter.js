'use strict';

/**
 * @ngdoc service
 * @name newsletterEditorApp.EventEmiter
 * @description
 * # Observable
 * Service in the newsletterEditorApp.
 */
angular.module('newsletterEditorApp')
  .service('EventEmiter', function($rootScope, $log) {
    /**
     * Lance un évenement à tout les observable.
     * @param eventName
     * @param props
     */
    this.emit = function(eventName, props) {
      $log.info(eventName + ' emitted');
      $rootScope.$broadcast(eventName, props);
    };

    /**
     * Listener un observable particulier.
     * @param eventName
     * @param cb
     */
    this.on = function(eventName, cb) {
      $rootScope.$on(eventName, function(event, data) {
        if (!data) {
          event.stopPropagation();
        }
        $log.info(eventName + ' catched');
        cb(event, data);
      });
    };

    /**
     * La même chose qu'on, en passant un scope enfant.
     * @param scope
     * @param eventName
     * @param cb
     */
    this.onEvent = function(scope, eventName, cb) {
      $log.info(eventName + ' catched');
      scope.$on(eventName, cb);
    };

  });
