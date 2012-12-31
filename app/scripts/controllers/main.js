'use strict';

tooglesApp.controller('MainCtrl', function($scope, $http, $routeParams, $location) {

  $scope.location = $location; // Used for setting active nav.

  window.searchCallback = function(data) {
    $scope.videos = data.feed.entry;
  }

  $scope.search = function() {
    var url = "https://gdata.youtube.com/feeds/api/standardfeeds/recently_featured?max-results=50&alt=json&callback=searchCallback";
    if ($routeParams.query !== undefined) {
      $scope.query = $routeParams.query;
      var url = "https://gdata.youtube.com/feeds/api/videos?max-results=24&alt=json&q=" + $routeParams.query + "&callback=searchCallback";
    }
    $http.jsonp(url);
  }

  $scope.updateUrl = function() {
    $location.path('/search/' + $scope.query);
  }

  $scope.search();
});

