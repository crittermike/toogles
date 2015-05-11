/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'youtube', function($scope, $routeParams, $location, youtube) {
  $scope.location = $location;
  $scope.searchsort = $location.search()['searchsort'] || false;
  $scope.searchduration = $location.search()['searchduration'] || false;
  $scope.searchdefinition = $location.search()['searchdefinition'] || false;
  $scope.searchdimension = $location.search()['searchdimension'] || false;
  $scope.section = $location.path().split('/')[1];
  $scope.searchtype = $location.search()['searchtype'] || 'videos';

  if (localStorage.tooglesDarkMode === "true") {
    $scope.$parent.darkmode = true;
  }
  $scope.$watch('darkmode', function (newVal, oldVal, scope) {
    if (typeof newVal !== "undefined" && newVal !== "undefined") {
      localStorage.tooglesDarkMode = newVal;
    }
  });

  $scope.categoryVideos = function() {
    youtube.categoryVideos($routeParams.category, function(response) {
      $scope.videos = response.items;
    });
  };

  $scope.searchVideos = function() {
    $scope.query = $routeParams.query;
    params = {};
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
    youtube.searchVideos($routeParams.query, params, function (response) {
      var ids = [];
      angular.forEach(response.items, function (item) {
        ids.push(item.id.videoId);
      });
      youtube.fetchVideos(ids, function (response) {
        $scope.videos = response.items;
      });
    });
  };

  $scope.userVideos = function() {
    youtube.userVideos($routeParams.username, function(response) {
      var ids = [];
      angular.forEach(response.items, function (item) {
        ids.push(item.id.videoId);
      });
      youtube.fetchVideos(ids, function(response) {
        $scope.videos = response.items;
      });
    });
    youtube.userData($routeParams.username, function(response) {
      $scope.user = response.items[0];
    });
  };

  $scope.popularVideos = function() {
    youtube.popularVideos(function(response) {
      $scope.videos = response.items;
    });
  };

  if ($routeParams.category !== undefined) {
    $scope.categoryVideos();
  } else if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
    $scope.searchVideos();
  } else if ($routeParams.username !== undefined) {
    $scope.userVideos();
  } else {
    $scope.popularVideos();
  }

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
