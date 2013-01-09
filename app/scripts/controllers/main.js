'use strict';

/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('SearchCtrl', function($scope, $http, $routeParams, $location) {
  $scope.location = $location;

  window.searchCallback = function(data) {
    $scope.videos = data.feed.entry;
  }

  $scope.categories = [
    {key: "Autos", title: "Autos & Vehicles"},
    {key: "Comedy", title: "Comedy"},
    {key: "Education", title: "Education"},
    {key: "Entertainment", title: "Entertainment"},
    {key: "Film", title: "Film & Animation"},
    {key: "Howto", title: "How To & Style"},
    {key: "Music", title: "Music"},
    {key: "News", title: "News & Politics"},
    {key: "People", title: "People & Blogs"},
    {key: "Animals", title: "Pets & Animals"},
    {key: "Tech", title: "Science & Technology"},
    {key: "Sports", title: "Sports"},
    {key: "Travel", title: "Travel & Events"},
  ]

  $scope.search = function() {
    var url = "https://gdata.youtube.com/feeds/api/standardfeeds/recently_featured?max-results=24&alt=json&callback=searchCallback";
    if ($routeParams.query !== undefined) {
      $scope.query = $routeParams.query;
      var url = "https://gdata.youtube.com/feeds/api/videos?max-results=24&alt=json&q=" + $routeParams.query + "&callback=searchCallback";
    } else if ($routeParams.category !== undefined) {
      var url = "https://gdata.youtube.com/feeds/api/standardfeeds/recently_featured_" + $routeParams.category + "?max-results=24&alt=json&callback=searchCallback";
    }
    $http.jsonp(url);
  }

  $scope.urlToID = function(url) {
    var parts = url.split("/");
    return parts.pop();
  }
  $scope.search();
});

/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', function($scope, $http, $routeParams, $location, $filter) {
  $scope.location = $location;

  window.viewCallback = function(data) {
    $scope.video = data.entry;
    var desc = data.entry.media$group.media$description.$t;
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    desc = desc.replace(exp,"<a href='$1'>$1</a>"); 
    desc = desc.replace(/\n/g, '<br />');
    $scope.video.desc = desc;
  }

  $scope.search = function() {
    var url = 'https://gdata.youtube.com/feeds/api/videos/' + $routeParams.query + '?v=2&alt=json&callback=viewCallback';
    $http.jsonp(url);
  }

  $scope.urlToID = function(url) {
    if (url) {
      var parts = url.split(":");
      return parts.pop();
    }
  }

  $scope.goBack = function() {
    history.back();
  }

  $scope.search();
});
