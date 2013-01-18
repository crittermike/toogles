tooglesApp.directive('whenScrolled', function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    window.onscroll = function() {
      if (window.innerHeight + document.body.scrollTop >= document.body.offsetHeight) {
        scope.$apply(attr.whenScrolled);
      }
    };
  };
});
