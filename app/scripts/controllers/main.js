'use strict';

tooglesApp.controller('MainCtrl', function($scope, $http, $routeParams, $location) {

  $scope.location = $location;

  window.searchCallback = function(data) {
    $scope.videos = data.feed.entry;
    if ($scope.videos.length === 1) {
      $scope.embed = $scope.videos[0].media$group.media$content[0].url;
    }
  }

  $scope.search = function() {
    var url = "https://gdata.youtube.com/feeds/api/standardfeeds/recently_featured?max-results=50&alt=json&callback=searchCallback";
    if ($routeParams.query !== undefined) {
      var url = "https://gdata.youtube.com/feeds/api/videos?max-results=24&alt=json&q=" + $routeParams.query + "&callback=searchCallback";
    }
    $http.jsonp(url);
  }

  if ($location.path().indexOf('search') !== '-1') {
    // Perform the initial search.
    $scope.search();
  }
});
