/**
 * The controller used when viewing a user's page.
 */
tooglesApp.controller('UserCtrl', ['$scope', '$http', '$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope) {
  $scope.location = $location;
  var resultsPerPage = 24;

  window.userCallback = function(data) {
    $scope.user = data.entry;
    console.log($scope.user);

    var desc = data.entry.summary.$t;
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    desc = desc.replace(exp,"<a href='$1'>$1</a>"); 
    desc = desc.replace(/\n/g, '<br />');
    $scope.user.desc = desc; // The linkified and line broken description
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
    $scope.page = $scope.page + 1;
    var url = 'https://gdata.youtube.com/feeds/api/users/' + $routeParams.username + '/uploads?start-index=' + ($scope.page * resultsPerPage + 1) + '&max-results=' + resultsPerPage + '&v=2&alt=json&callback=userVideosCallback';
    $http.jsonp(url);
  }

  $scope.urlToID = function(url) {
    var parts = url.split(":");
    return parts.pop();
  }

  var url = 'https://gdata.youtube.com/feeds/api/users/' + $routeParams.username + '?v=2&alt=json&callback=userCallback';
  $http.jsonp(url);
  var url = 'https://gdata.youtube.com/feeds/api/users/' + $routeParams.username + '/uploads?v=2&max-results=' + resultsPerPage + '&alt=json&callback=userVideosCallback';
  $http.jsonp(url);
}]);
