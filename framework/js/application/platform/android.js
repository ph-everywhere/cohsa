// Generated by CoffeeScript 1.4.0
(function() {

  this.AndroidBehaviour = (function() {

    function AndroidBehaviour() {
      document.addEventListener("backbutton", _nav.back, false);
      $('[data-android-go]').live('keyup', function(e) {
        var t;
        t = ensure($(e.target), '[data-android-go]');
        if (e.which === 13) {
          $(t.attr('data-android-go')).click();
        }
        e.preventDefault();
        return false;
      });
    }

    return AndroidBehaviour;

  })();

}).call(this);
