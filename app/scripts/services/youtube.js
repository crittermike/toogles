tooglesApp.service('youtube', ['$http', function($http) {

  var urlBase = 'https://www.googleapis.com/youtube/v3/';
  var apiKey = 'AIzaSyAZDgDzsLyU1E1D2Ic76Eol2NbuBp8SKyg';
  var count = 12;

  this.searchVideos = function(pageToken, query, params, callback) {
    var url = urlBase + 'search?part=id&type=video&maxResults=' + count + '&q=' + query + '&key=' + apiKey;
    if (params) {
      url += '&' + $.param(params);
    }
    if (pageToken) {
      url += "&pageToken=" + pageToken;
    }
    return this.sendRequest(url, callback);
  };

  this.relatedVideos = function(id, callback) {
    var url = urlBase + 'search?part=id&type=video&maxResults=' + count + '&relatedToVideoId=' + id + '&key=' + apiKey;
    return this.sendRequest(url, callback);
  };

  this.popularVideos = function(pageToken, callback) {
    var url = urlBase + 'videos?part=statistics,snippet,contentDetails&chart=mostPopular&maxResults=' + count + '&key=' + apiKey;
    if (pageToken) {
      url += "&pageToken=" + pageToken;
    }
    return this.sendRequest(url, callback);
  };

  this.fetchVideos = function(ids, callback) {
    if ($.isArray(ids)) {
      ids = ids.join(',');
    }
    var url = urlBase + 'videos?part=statistics,snippet,contentDetails&id=' + ids + '&key=' + apiKey;
    return this.sendRequest(url, callback);
  };

  this.categoryVideos = function(pageToken, category, callback) {
    var url = urlBase + 'videos?part=statistics,snippet,contentDetails&chart=mostPopular&maxResults=' + count + '&videoCategoryId=' + category + '&key=' + apiKey;
    if (pageToken) {
      url += "&pageToken=" + pageToken;
    }
    return this.sendRequest(url, callback);
  };

  this.videoCategories = function(callback) {
    var url = urlBase + 'videoCategories?part=snippet&regionCode=US&key=' + apiKey;
    return this.sendRequest(url, callback);
  };

  this.userVideos = function(pageToken, user, callback) {
    var url = urlBase + 'search?part=id&order=date&maxResults=' + count + '&channelId=' + user + '&key=' + apiKey;
    if (pageToken) {
      url += "&pageToken=" + pageToken;
    }
    return this.sendRequest(url, callback);
  };

  this.userData = function(user, callback) {
    var url = urlBase + 'channels?part=snippet,statistics&order=date&maxResults=' + count + '&id=' + user + '&key=' + apiKey;
    return this.sendRequest(url, callback);
  };

  this.sendRequest = function(url, callback) {
    return $http.get(url)
      .success(function(data, status, headers, config) {
        callback(data)
      })
      .error(function(data, status, headers, config) {
        // @TODO: Basic error handling
      });
  };

  this.formatDuration = function(duration) {
    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    var hours = 0, minutes = 0, seconds = 0, totalsecondsonds;

    if (reptms.test(duration)) {
      var matches = reptms.exec(duration);
      if (matches[1]) { hours = Number(matches[1])}
      if (matches[2]) { minutes = Number(matches[2])}
      if (matches[3]) { seconds = Number(matches[3])}
      var totalseconds = hours * 3600  + minutes * 60 + seconds;
      var hours = parseInt( totalseconds / 3600 ) % 24;
      var minutes = parseInt( totalseconds / 60 ) % 60;
      var seconds = totalseconds % 60;

      var result = '';
      if (hours > 0) {
        result += hours + ':';
      }
      if (hours > 0) {
        result += (minutes < 10 ? '0' + minutes : minutes) + ':';
      } else {
        result += minutes + ':';
      }
      result += (seconds < 10 ? '0' + seconds : seconds);
      return result;
    }
  };

  this.averageRating = function(likes, dislikes) {
    likes = parseInt(likes);
    dislikes = parseInt(dislikes);
    var total = likes + dislikes;
    var average = likes / total;
    return average * 100;
  };
}]);
