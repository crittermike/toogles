/**
 * The controller used when viewing a user's page.
 */
tooglesApp.controller('UserCtrl', ['$scope', '$http', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $http, $routeParams, $location, $rootScope, youtube) {
  $scope.location = $location;
  var resultsPerPage = 24;

  window.userCallback = function(data) {
    $scope.user = data.entry;
  }

  window.userVideosCallback = function(data) {
    if (!$scope.videos) {
      $scope.videos = data.feed.entry;
    } else {
      $scope.videos.push.apply($scope.videos, data.feed.entry);
    }
  }

  $scope.page = 0;
  $scope.loadMore = function() {
    youtube.getVideos('user', $routeParams.username, ($scope.page * resultsPerPage + 1), resultsPerPage, 'userVideosCallback');
    $scope.page = $scope.page + 1;
  }
  $scope.loadMore();

  $scope.urlToID = function(url) {
    return youtube.urlToID(url, ':');
  }

  youtube.getUser($routeParams.username, 'userCallback');
}]);
