// Generated by CoffeeScript 1.4.0
(function() {
  var global_debug;

  this.debug_modules_info = {
    database: 0,
    framework: 0,
    layout: 0,
    model__user: 0,
    menu: 0,
    navigation: 0,
    network: 0,
    replacer: 0,
    router: 0,
    security: 0,
    transitioner: 0,
    validator: 0
  };

  global_debug = false;

  this.is_debug = function(module) {
    if (debug_modules_info[module] != null) {
      return debug_modules_info[module] === 1 || global_debug;
    } else {
      return global_debug;
    }
  };

  this.h = function(msg) {
    if (msg == null) {
      msg = 'hear';
    }
  };

}).call(this);
