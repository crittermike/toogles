'use strict';

/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('SearchCtrl', function($scope, $http, $routeParams, $location) {
  $scope.location = $location;

  var resultsPerPage = 24;

  window.searchCallback = function(data) {
    if (!$scope.videos) {
      $scope.videos = data.feed.entry;
    } else {
      $scope.videos.push.apply($scope.videos, data.feed.entry);
    }
  }

  $scope.page = 0;
  $scope.loadMore = function() {
    $scope.page = $scope.page + 1;
    $scope.search();
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
    var startIndex = $scope.page * resultsPerPage + 1;
    var url = "https://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?time=today&start-index=" + startIndex + "&max-results=" + resultsPerPage + "&alt=json&callback=searchCallback";

    if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
      // This is a search with a specific query.
      $scope.query = $routeParams.query;
      var url = "https://gdata.youtube.com/feeds/api/videos?start-index=" + startIndex + "&max-results=" + resultsPerPage + "&alt=json&q=" + $routeParams.query + "&callback=searchCallback";

    } else if ($routeParams.category !== undefined) {
      // This is a category page.
      var url = "https://gdata.youtube.com/feeds/api/standardfeeds/most_viewed_" + $routeParams.category + "?time=today&start-index=" + startIndex + "&max-results=" + resultsPerPage + "&alt=json&callback=searchCallback";
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
    $scope.video.desc = desc; // The linkified and line broken description

    $scope.video.authorname = data.entry.author[0].uri.$t.split('/').pop();
  }

  $scope.urlToID = function(url) {
    if (url) {
      var parts = url.split(":");
      return parts.pop();
    }
  }

  var url = 'https://gdata.youtube.com/feeds/api/videos/' + $routeParams.query + '?v=2&alt=json&callback=viewCallback';
  $http.jsonp(url);
});
