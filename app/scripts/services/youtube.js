tooglesApp.service('youtube', ['$http', function($http) {

  this.getVideo = function(id, callback) {
    var url = 'https://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json&callback=' + callback;
    $http.jsonp(url);
  }

  this.getUser = function(id, callback) {
    var url = 'https://gdata.youtube.com/feeds/api/users/' + id + '?v=2&alt=json&callback=' + callback;
    $http.jsonp(url);
  }

  this.getVideos = function(type, query, offset, count, callback) {
    if (type === 'user') {
      var url = 'https://gdata.youtube.com/feeds/api/users/' + query + '/uploads?start-index=' + offset + '&max-results=' + count + '&v=2&alt=json&callback=' + callback;
    } else if (type === 'category') {
      var url = "https://gdata.youtube.com/feeds/api/standardfeeds/most_viewed_" + query + "?time=today&start-index=" + offset + "&max-results=" + count + "&alt=json&callback=" + callback;
    } else if (type === 'search') {
      var url = "https://gdata.youtube.com/feeds/api/videos?q=" + query + "&time=today&start-index=" + offset + "&max-results=" + count + "&alt=json&callback=" + callback;
    } else {
      var url = "https://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?time=today&start-index=" + offset + "&max-results=" + count + "&alt=json&callback=" + callback;
    }
    $http.jsonp(url);
  }

  // Take a URL with an ID in it and grab the ID out of it. Helper function for YouTube URLs.
  this.urlToID = function(url, separator) {
    if (url) {
      var parts = url.split(separator); // Some URLs are separated with : instead of /
      return parts.pop();
    }
  }
}]);
