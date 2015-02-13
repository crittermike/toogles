'use strict';

/**
 * @ngdoc overview
 * @name tooglesApp
 *
 * Main module of the application.
 */
var tooglesApp = angular.module('tooglesApp', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/browse', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/browse/:category', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/search/:query', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/view/:id', { templateUrl: 'views/view.html', controller: 'ViewCtrl' });
    $routeProvider.when('/view/:id/:starttime', { templateUrl: 'views/view.html', controller: 'ViewCtrl' });
    $routeProvider.when('/playlist/:id', { templateUrl: 'views/view.html', controller: 'ViewCtrl' });
    $routeProvider.when('/playlist/:id/:start', { templateUrl: 'views/view.html', controller: 'ViewCtrl' });
    $routeProvider.when('/user/:username', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/user/:username/:feed', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.otherwise({ redirectTo: '/browse' });
  }]);