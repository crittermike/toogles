tooglesApp.filter('htmlify', function() {
  return function(input) {
    if (!input) {
      return "";
    }
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var out = input.replace(exp,"<a href='$1'>$1</a>"); 
    out = out.replace(/\n/g, '<br />');
    return out;
  }
});
