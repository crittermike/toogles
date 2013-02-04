tooglesApp.service('youtube', ['$http', function($http) {

  var urlBase = "https://gdata.youtube.com/feeds/api/";

  var offset = 1;
  var count = 24;
  var callback = 'searchCallback';
  var duration = false;
  var time = false;
  var orderBy = false;
  var searchType = 'videos';

  this.setPage = function(page) {
    offset = page * count + 1;
  }
  this.setSort = function(sort) {
    orderBy = sort;
  }
  this.setTime = function(when) {
    time = when;
  }
  this.setDuration = function(length) {
    duration = length;
  }
  this.setType = function(type) {
    searchType = type;
  }
  this.setCallback = function(fn) {
    callback = fn;
  }

  this.getItem = function(type, id) {
    var url = 'https://gdata.youtube.com/feeds/api/' + type + '/' + id + '?safeSearch=none&v=2&alt=json&callback=' + callback;
    $http.jsonp(url);
  }

  this.getVideos = function(type, query) {
    query = encodeURIComponent(query);
    if (type === 'related') {
      // All videos by a user
      var url = urlBase + 'videos/' + query + '/related?&v=2&alt=json&callback=' + callback;

    } else if (type === 'user') {
      // All videos by a user
      var url = urlBase + 'users/' + query + '/uploads?start-index=' + offset + '&max-results=' + count + '&v=2&alt=json&callback=' + callback;

    } else if (type === 'user_favorites') {
      // All videos by a user
      var url = urlBase + 'users/' + query + '/favorites?start-index=' + offset + '&max-results=' + count + '&v=2&alt=json&callback=' + callback;

    } else if (type === 'user_subscriptions') {
      // All videos by a user
      var url = urlBase + 'users/' + query + '/newsubscriptionvideos?start-index=' + offset + '&max-results=' + count + '&v=2&alt=json&callback=' + callback;

    } else if (type === 'user_playlists') {
      // All videos by a user
      var url = urlBase + 'users/' + query + '/playlists?start-index=' + offset + '&max-results=' + count + '&v=2&alt=json&callback=' + callback;

    } else if (type === 'category') {
      // All videos within a category
      var url = urlBase + "standardfeeds/most_viewed_" + query + "?time=today&start-index=" + offset + "&max-results=" + count + "&safeSearch=none&v=2&alt=json&callback=" + callback;

    } else if (type === 'search') {
      // A search query for videos
      path = 'videos';
      if (searchType == 'playlists') {
        path = 'playlists/snippets';
      }
      var url = urlBase + path + "?q=" + query + "&start-index=" + offset + "&max-results=" + count + "&safeSearch=none&v=2&alt=json&callback=" + callback;
      if (time) {
        url += '&time=' + time;
      }
      if (duration) {
        url += '&duration=' + duration;
      }
      if (orderBy && searchType != 'playlists') {
        url += '&orderby=' + orderBy;
      }
    } else {
      // Most popular recent videos
      var url = urlBase + "standardfeeds/most_viewed?time=today&start-index=" + offset + "&max-results=" + count + "&safeSearch=none&v=2&alt=json&callback=" + callback;
    }
    $http.jsonp(url);
  }

  // Take a URL with an ID in it and grab the ID out of it. Helper function for YouTube URLs.
  this.urlToID = function(url) {
    if (url) {
      var parts = url.split('/');
      if (parts.length === 1) {
        parts = url.split(':'); // Some URLs are separated with : instead of /
      }
      return parts.pop();
    }
  }

  this.formatDuration = function(seconds) {
    sec_numb    = parseInt(seconds);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (minutes < 10 && hours !== 0) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time = minutes+':'+seconds;
    if (hours !== 0) {
      time = hours + ":" + time;
    }
    return time;
  }
}]);
