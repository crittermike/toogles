'use strict';

// Boilerplate for Angular
var tooglesApp = angular.module('tooglesApp', ['ngSanitize'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/browse', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/browse/:category', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/search/:query', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/view/:query', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .otherwise({
        redirectTo: '/browse'
      });
  }])
  .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
      var raw = elm[0];

      window.onscroll = function() {
        if (window.innerHeight + document.body.scrollTop >= document.body.offsetHeight) {
          scope.$apply(attr.whenScrolled);
        }
      };
    };
  });

// Boilerplate for Foundation
;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

})(jQuery, this);
