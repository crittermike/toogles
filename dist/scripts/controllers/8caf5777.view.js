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
    onYouTubeIframeAPIReady($scope.video.video_id);
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

  started = false;

  var onYouTubeIframeAPIReady = function(id) {
    var player = new YT.Player('player', {
      videoId: id,
      events: {
        'onStateChange': function (event) {
          if (event.data == 1) {
            started = true;
          }
          if (started && event.data == -1) {
            var video_url = event.target.i.videoUrl;
            var video_id = video_url.replace('http://www.youtube.com/watch?v=', '').replace('&feature=player_embedded', '');
            window.location = '#/view/' + video_id;
          }
        }
      }
    });
  }
}]);
