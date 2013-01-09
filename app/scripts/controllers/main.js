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
      if ($location.path().indexOf('search') > -1) {
        $scope.query = $routeParams.query;
      }
      var url = "https://gdata.youtube.com/feeds/api/videos?max-results=24&alt=json&q=" + $routeParams.query + "&callback=searchCallback";
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
    desc = desc.replace(/\n/g, '|||');
    desc = $filter('linky')(desc);
    $scope.video.desc = desc.replace("|||", '<br/>');
    // TODO FIX THIS
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

  $scope.search();
});
