/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('ListCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $routeParams, $location, $rootScope, youtube) {
  $rootScope.previous = $location.path();
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
    if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
      // This is a search with a specific query.
      document.title = $routeParams.query + " | Toogles";
      $scope.query = $routeParams.query;
      youtube.getVideos('search', $scope.query, startIndex, resultsPerPage, 'searchCallback');

    } else if ($routeParams.category !== undefined) {
      // This is a category page.
      document.title = $routeParams.category + " | Toogles";;
      youtube.getVideos('category', $routeParams.category, startIndex, resultsPerPage, 'searchCallback');

    } else {
      document.title = "Toogles | Awesome goggles for YouTube";
      youtube.getVideos('browse', '', startIndex, resultsPerPage, 'searchCallback');
    }
  }
  $scope.search();

  $scope.urlToID = function(url) {
    return youtube.urlToID(url, '/');
  }

}]);

