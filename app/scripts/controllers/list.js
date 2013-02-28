/**
 * The controller used when searching/browsing videos.
 */
tooglesApp.controller('ListCtrl', ['$scope', '$routeParams', '$location', 'youtube', function($scope, $routeParams, $location, youtube) {
  $scope.location = $location;
  $scope.searchsort = $location.search()['searchsort'] || false;
  $scope.searchduration = $location.search()['searchduration'] || false;
  $scope.searchtime = $location.search()['searchtime'] || false;
  $scope.section = $location.path().split('/')[1];
  $scope.searchtype = $location.search()['searchtype'] || 'videos';

  window.searchCallback = function(data) {
    if (!$scope.videos) {
      $scope.videos = data.feed.entry;
    } else {
      $scope.videos.push.apply($scope.videos, data.feed.entry);
    }
  }

  window.userCallback = function(data) {
    $scope.user = data.entry;
  }

  $scope.getLink = function(video, index) {
    if ($scope.resulttype == 'playlists') {
      return '#/playlist/' + video.yt$playlistId.$t;
    }
    return '#/view/' + youtube.urlToID(video.media$group.yt$videoid.$t);
  }

  $scope.page = 0;
  $scope.loadMore = function() {
    $scope.page = $scope.page + 1;
    $scope.search();
  }

  $scope.categories = [
    {key: "Autos", title: "Autos & Vehicles"},
    {key: "Comedy", title: "Comedy"},
    {key: "Education", title: "Education"},
    {key: "Entertainment", title: "Entertainment"},
    {key: "Film", title: "Film & Animation"},
    {key: "Howto", title: "How To & Style"},
    {key: "Music", title: "Music"},
    {key: "News", title: "News & Politics"},
    {key: "People", title: "People & Blogs"},
    {key: "Animals", title: "Pets & Animals"},
    {key: "Tech", title: "Science & Technology"},
    {key: "Sports", title: "Sports"},
    {key: "Travel", title: "Travel & Events"},
  ]

  $scope.search = function() {
    youtube.setPage($scope.page);
    youtube.setCallback('searchCallback');
    if ($routeParams.query !== undefined && $routeParams.query !== "" && $routeParams.query !== "0") {
      // This is a search with a specific query.
      document.title = $routeParams.query + " | Toogles";
      $scope.query = $routeParams.query;
      youtube.getVideos('search', $scope.query);

    } else if ($routeParams.category !== undefined) {
      // This is a category page.
      document.title = $routeParams.category + " | Toogles";;
      youtube.getVideos('category', $routeParams.category);

    } else if ($routeParams.username !== undefined) {
      // This is a user page.
      var type = 'user';
      if ($routeParams.feed !== undefined) {
        type += '_' + $routeParams.feed;
        if ($routeParams.feed === 'playlists') {
          $scope.resulttype = 'playlists'
        }
      }
      document.title = $routeParams.username + " | Toogles";;
      youtube.getVideos(type, $routeParams.username);
      youtube.setCallback('userCallback');
      youtube.getItem('users', $routeParams.username);

    } else {
      document.title = "Toogles | Awesome goggles for YouTube";
      youtube.getVideos('browse', '');
    }
  }

  $scope.$watch('searchsort + searchtime + searchduration + searchtype', function() {
    $scope.videos = false;
    youtube.setSort($scope.searchsort);
    youtube.setTime($scope.searchtime);
    youtube.setDuration($scope.searchduration);
    youtube.setType($scope.searchtype);
    $scope.resulttype = $scope.searchtype;
    $scope.search();
  })

  $scope.urlToID = function(url) {
    return youtube.urlToID(url);
  }
  $scope.formatDuration = function(seconds) {
    return youtube.formatDuration(seconds);
  }

}]);
