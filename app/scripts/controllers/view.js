/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$routeParams', '$location', 'youtube', function($scope, $routeParams, $location, youtube) {

  $scope.location = $location; // Access $location inside the view.
  $scope.showSidebar = true;
  $scope.showRelated = false;
  $scope.section = $location.path().split('/')[1];
  $scope.videoTab = $scope.section === 'view' ? 'Related' : 'Playlist';

  if (localStorage.tooglesDarkMode === "true") {
    $scope.$parent.darkmode = true;
  }
  $scope.$watch('darkmode', function (newVal, oldVal, scope) {
    if (typeof newVal !== "undefined" && newVal !== "undefined") {
      localStorage.tooglesDarkMode = newVal;
    }
  });

  youtube.fetchVideos($routeParams.id, function(response) {
    $scope.video = response.items[0];
    onYouTubeIframeAPIReady($scope.video.id, $scope.section);
    document.title = $scope.video.title + " | Toogles";
  });

  $scope.formatDuration = function(seconds) {
    return youtube.formatDuration(seconds);
  };

  var started = false;

  if ($scope.$parent.darkmode) {
    var theme = 'dark';
    var color = 'black';
  } else {
    var theme = 'light';
    var color = 'white';
  }

  var onYouTubeIframeAPIReady = function(id, section) {
    var starttime = $routeParams.starttime || 0;

    var player = new YT.Player('player', {
      'videoId': id,
      'playerVars': {
        'autoplay': 1,
        'theme': theme,
        'color': color,
        'iv_load_policy': 3,
        'origin': 'http://toogl.es',
        'start': starttime
      },
      'events': {
        'onError': function(event) {
          if (event.data == 101 || event.data == 150) {
            $scope.video.restricted = 1;
          } else {
            $scope.video.deleted = 1;
          }
          $scope.$apply();
        },
        'onStateChange': function (event) {
          if (event.data == 1) {
            started = true;
          }
          if (started && event.data == -1) {
            // When a new video is started in an existing player, open up its dedicated page.
            if (section === 'view') {
              var video_url = event.target.getVideoUrl();
              var video_id = video_url.replace('http://', '').replace('https://', '').replace('www.youtube.com/watch?v=', '').replace('&feature=player_embedded', '');
              window.location = '#/view/' + video_id;
            } else if (section === 'playlist') {
              window.location = '#/playlist/' + event.target.getPlaylistId() + '/' + event.target.getPlaylistIndex();
            }
          }
          else if (started && event.data == 0 && section === 'playlist') {
            var pathParts = $location.path().split('/');
            var playlistId = pathParts[2];
            if (pathParts[3]) {
              var videoNum = pathParts[3];
            } else {
              var videoNum = 0;
            }
            videoNum++;

            window.location = '#/playlist/' + playlistId + '/' + videoNum;
          }
        }
      }
    });
  }

  $scope.averageRating = function(likeCount, dislikeCount) {
    return youtube.averageRating(likeCount, dislikeCount);
  }
}]);
