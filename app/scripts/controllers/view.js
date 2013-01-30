/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $routeParams, $location, $rootScope, youtube) {

  $scope.location = $location; // Access $location inside the view.
  $scope.showSidebar = true;
  $scope.backLink = '#' + ($rootScope.previous || '/browse');

  window.viewCallback = function(data) {
    $scope.video = data.entry;
    $scope.video.video_id = youtube.urlToID($scope.video.id.$t)
    document.title = $scope.video.title.$t + " | Toogles";
  }

  youtube.getVideo($routeParams.id, 'viewCallback');
}]);
