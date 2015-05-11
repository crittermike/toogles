/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'youtube', function($scope, $routeParams, $location, youtube) {
  $scope.location = $location;
  $scope.routeParams = $routeParams;
  $scope.searchsort = $location.search()['searchsort'] || false;
  $scope.searchduration = $location.search()['searchduration'] || false;
  $scope.searchdefinition = $location.search()['searchdefinition'] || false;
  $scope.searchdimension = $location.search()['searchdimension'] || false;
  $scope.searchtype = $location.search()['searchtype'] || 'videos';
  $scope.section = $location.path().split('/')[1];
  $scope.page = 1;
  $scope.nextPageToken = '';
  $scope.usedTokens = [];
  $scope.videos = [];

  if (localStorage.tooglesDarkMode === "true") {
    $scope.$parent.darkmode = true;
  }
  $scope.$watch('darkmode', function (newVal, oldVal, scope) {
    if (typeof newVal !== "undefined" && newVal !== "undefined") {
      localStorage.tooglesDarkMode = newVal;
    }
  });

  $scope.categoryVideos = function() {
    document.title = 'Popular | Toogles';
    youtube.categoryVideos($scope.nextPageToken, $routeParams.category, function(response) {
      $scope.nextPageToken = response.nextPageToken;
      $scope.videos = $scope.videos.concat(response.items);
    });
  };

  $scope.searchVideos = function() {
    document.title = $routeParams.query + ' | Toogles';
    $scope.query = $routeParams.query;
    var params = {};
    if ($routeParams.searchsort) {
      params.order = $routeParams.searchsort;
    }
    if ($routeParams.searchduration) {
      params.videoDuration = $routeParams.searchduration;
    }
    if ($routeParams.searchdimension) {
      params.videoDimension = $routeParams.searchdimension;
    }
    if ($routeParams.searchdefinition) {
      params.videoDefinition = $routeParams.searchdefinition;
    }
    youtube.searchVideos($scope.nextPageToken, $routeParams.query, params, function (response) {
      $scope.nextPageToken = response.nextPageToken;
      var ids = [];
      angular.forEach(response.items, function (item) {
        ids.push(item.id.videoId);
      });
      youtube.fetchVideos(ids, function (response) {
        $scope.videos = $scope.videos.concat(response.items);
      });
    });
  };

  $scope.userVideos = function() {
    document.title = $routeParams.username + ' | Toogles';
    youtube.userVideos($scope.nextPageToken, $routeParams.username, function(response) {
      $scope.nextPageToken = response.nextPageToken;
      var ids = [];
      angular.forEach(response.items, function (item) {
        ids.push(item.id.videoId);
      });
      youtube.fetchVideos(ids, function(response) {
        $scope.videos = $scope.videos.concat(response.items);
      });
    });
    youtube.userData($routeParams.username, function(response) {
      $scope.user = response.items[0];
    });
  };

  $scope.popularVideos = function() {
    document.title = 'Popular | Toogles';
    youtube.popularVideos($scope.nextPageToken, function(response) {
      $scope.nextPageToken = response.nextPageToken;
      $scope.videos = $scope.videos.concat(response.items);
    });
  };

  $scope.loadVideos = function() {
    if ($scope.nextPageToken === undefined || $.inArray($scope.nextPageToken, $scope.usedTokens) >= 0 && $scope.nextPageToken !== '') {
      return;
    }
    $scope.usedTokens.push($scope.nextPageToken);
    if ($routeParams.category !== undefined) {
      $scope.categoryVideos();
    } else if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
      $scope.searchVideos();
    } else if ($routeParams.username !== undefined) {
      $scope.userVideos();
    } else {
      $scope.popularVideos();
    }
  };

  $scope.loadVideos();

  youtube.videoCategories(function(response) {
    $scope.categories = response.items;
  });

  $scope.getLink = function(video) {
    return '#/view/' + video.id
  };

  $scope.formatDuration = function(seconds) {
    return youtube.formatDuration(seconds);
  };

  $scope.averageRating = function(likeCount, dislikeCount) {
    return youtube.averageRating(likeCount, dislikeCount);
  }

}]);
