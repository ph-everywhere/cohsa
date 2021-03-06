// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Counter = (function() {

    function Counter(f, message, n, t) {
      if (message == null) {
        message = 'Executing';
      }
      if (n == null) {
        n = 3;
      }
      if (t == null) {
        t = 1000;
      }
      this.wrap = __bind(this.wrap, this);

      this.timer_handle = setInterval(this.wrap(f, n, message), t);
    }

    Counter.prototype.wrap = function(f, n, message) {
      var i,
        _this = this;
      i = 0;
      return function() {
        if (i === n) {
          f();
          return clearTimeout(_this.timer_handle);
        } else {
          console.log(message + ' in ' + (n - i));
          return i += 1;
        }
      };
    };

    return Counter;

  })();

}).call(this);
