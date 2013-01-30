/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $routeParams, $location, $rootScope, youtube) {

  $scope.location = $location; // Access $location inside the view.
  $scope.showSidebar = true;
  $scope.showRelated = false;
  $scope.backLink = '#' + ($rootScope.previous || '/browse');

  window.viewCallback = function(data) {
    $scope.video = data.entry;
    $scope.video.video_id = youtube.urlToID($scope.video.id.$t)
    document.title = $scope.video.title.$t + " | Toogles";
  }

  window.relatedCallback = function(data) {
    $scope.videos = data.feed.entry;
  }

  $scope.fetchRelated = function() {
    if (!$scope.videos) {
      youtube.setCallback('relatedCallback');
      youtube.getVideos('related', $routeParams.id);
    }
    $scope.showRelated = true;
  }

  youtube.setCallback('viewCallback');
  youtube.getVideo($routeParams.id);
}]);
