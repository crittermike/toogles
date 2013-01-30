/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$routeParams', '$location', 'youtube', function($scope, $routeParams, $location, youtube) {

  $scope.location = $location; // Access $location inside the view.
  $scope.showSidebar = true;
  $scope.showRelated = false;

  window.viewCallback = function(data) {
    $scope.video = data.entry;
    $scope.video.video_id = youtube.urlToID($scope.video.id.$t)
    $scope.video.embedurl = "http://www.youtube.com/embed/" + $scope.video.video_id + "?autoplay=1";
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

  $scope.urlToID = function(url) {
    return youtube.urlToID(url);
  }
  $scope.formatDuration = function(seconds) {
    return youtube.formatDuration(seconds);
  }

  youtube.setCallback('viewCallback');
  youtube.getVideo($routeParams.id);
}]);
