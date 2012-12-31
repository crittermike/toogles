'use strict';

tooglesApp.controller('MainCtrl', function($scope, $http) {

  window.searchCallback = function(data) {
    $scope.videos = data.feed.entry;
    console.log($scope.videos);
  }

  $scope.search = function() {
    var url = "https://gdata.youtube.com/feeds/api/videos?max-results=50&alt=json&q=" + $scope.query + "&callback=searchCallback";
    $http.jsonp(url);
  }
});

