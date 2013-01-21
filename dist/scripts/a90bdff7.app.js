'use strict';

// Angular setup
var tooglesApp = angular.module('tooglesApp', ['ngSanitize'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/browse', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/browse/:category', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/search/:query', { templateUrl: 'views/list.html', controller: 'ListCtrl' });
    $routeProvider.when('/view/:id', { templateUrl: 'views/view.html', controller: 'ViewCtrl' });
    $routeProvider.when('/user/:username', { templateUrl: 'views/user.html', controller: 'ListCtrl' });
    $routeProvider.otherwise({ redirectTo: '/browse' });
  }]);
