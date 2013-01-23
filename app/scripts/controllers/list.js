/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('ListCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $routeParams, $location, $rootScope, youtube) {
  $rootScope.previous = $location.path();
  $scope.location = $location;
  $scope.sort = false;
  $scope.duration = false;
  $scope.time = false;

  window.searchCallback = function(data) {
    if (!$scope.videos) {
      $scope.videos = data.feed.entry;
    } else {
      $scope.videos.push.apply($scope.videos, data.feed.entry);
    }
  }

  window.userCallback = function(data) {
    $scope.user = data.entry;
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
    youtube.setPage($scope.page);
    youtube.setCallback('searchCallback');;
    if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
      // This is a search with a specific query.
      document.title = $routeParams.query + " | Toogles";
      $scope.query = $routeParams.query;
      youtube.getVideos('search', $scope.query);

    } else if ($routeParams.category !== undefined) {
      // This is a category page.
      document.title = $routeParams.category + " | Toogles";;
      youtube.getVideos('category', $routeParams.category);

    } else if ($routeParams.username !== undefined) {
      // This is a user page.
      var type = 'user';
      if ($routeParams.feed !== undefined) {
        type += '_' + $routeParams.feed;
      }
      document.title = $routeParams.username + " | Toogles";;
      youtube.getVideos(type, $routeParams.username);
      youtube.getUser($routeParams.username, 'userCallback');

    } else {
      document.title = "Toogles | Awesome goggles for YouTube";
      youtube.getVideos('browse', '');
    }
  }

  $scope.$watch('sort + time + duration', function() {
    youtube.setSort($scope.sort);
    youtube.setTime($scope.time);
    youtube.setDuration($scope.duration);
    $scope.videos = false;
    $scope.search();
  })

  $scope.urlToID = function(url) {
    return youtube.urlToID(url);
  }
  $scope.formatDuration = function(seconds) {
    return youtube.formatDuration(seconds);
  }

}]);
