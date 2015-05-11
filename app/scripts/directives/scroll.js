tooglesApp.directive('whenScrolled', function() {
  return function(scope, elm, attr) {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});
