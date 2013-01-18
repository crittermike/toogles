/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'youtube', function($scope, $routeParams, $location, $rootScope, youtube) {

  $scope.location = $location; // Access $location inside the view.
  $scope.showSidebar = true;

  window.viewCallback = function(data) {
    $scope.video = data.entry;
    document.title = $scope.video.title.$t + " | Toogles";
  }

  $scope.urlToID = function(url) {
    return youtube.urlToID(url, ':');
  }

  // Go back to the previous page if one exists, otherwise the homepage.
  $scope.goBack = function() {
    if ($rootScope.previous) {
      history.back();
    } else {
      $location.path('/browse');
    }
  }

  youtube.getVideo($routeParams.id, 'viewCallback');
}]);
