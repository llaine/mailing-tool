'use strict';

/**
 * @ngdoc overview
 * @name newsletterEditorApp
 * @description
 * # newsletterEditorApp
 *
 * Main module of the application.
 */
angular
  .module('newsletterEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ui.bootstrap',
    'ckeditor',
    'restangular'
  ])

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  //la configuration de Restangular
  .config(function(RestangularProvider) {
    // TODO tester si location = localhost --> setup localhost sinon l'api de l'url en préprod.
    RestangularProvider.setBaseUrl('http://api.preprod.bobelweb.eu/');
  })

  //configuration du provider $http
  .config(['$httpProvider', function($httpProvider) {
    //pour transmettre le cookie de debug à l'API
    $httpProvider.defaults.withCredentials = true;
  }])

  //définition de la fonction safeApply sur le rootScope
  .run(function($rootScope) {
    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  });
