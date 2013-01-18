/**
 * The controller used when viewing an individual video.
 */
tooglesApp.controller('ViewCtrl', ['$scope', '$http', '$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope) {
  $scope.location = $location;
  $scope.showSidebar = true;

  window.viewCallback = function(data) {
    $scope.video = data.entry;

    var desc = data.entry.media$group.media$description.$t;
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    desc = desc.replace(exp,"<a href='$1'>$1</a>"); 
    desc = desc.replace(/\n/g, '<br />');
    $scope.video.desc = desc; // The linkified and line broken description

    $scope.video.authorname = data.entry.author[0].uri.$t.split('/').pop();
    document.title = $scope.video.title.$t + " | Toogles";
  }

  $scope.urlToID = function(url) {
    if (url) {
      var parts = url.split(":");
      return parts.pop();
    }
  }

  $scope.goBack = function() {
    if ($rootScope.previous) {
      history.back();
    } else {
      $location.path('/browse');
    }
  }

  var url = 'https://gdata.youtube.com/feeds/api/videos/' + $routeParams.id + '?v=2&alt=json&callback=viewCallback';
  $http.jsonp(url);
}]);
