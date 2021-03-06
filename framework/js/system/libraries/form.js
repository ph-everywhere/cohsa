// Generated by CoffeeScript 1.4.0
(function() {

  this.Form = (function() {
    var _adjust_caption;

    function Form() {}

    Form.init = function() {
      Form.pre_process();
      Form._phone($("[data-special-field-type=\"phone\"]"));
      Form._cpf($("[data-special-field-type=\"cpf\"]"));
      Form._cnpj($("[data-special-field-type=\"cnpj\"]"));
      Form._number($("[data-special-field-type=\"number\"]"));
      Form._currency($("[data-special-field-type=\"currency\"]"));
      Form._select_others($("[data-special-field-type=\"select_others\"]"));
      Form._datetime($("[data-special-field-type=\"datetime\"]"));
      Form._time($("[data-special-field-type=\"time\"]"));
      Form._date($("[data-special-field-type=\"date\"]"));
      Form._datetime($("[data-special-field-type=\"datetime\"]"));
      Form._confirm($("[data-confirm]"));
      Form._clear_field($('[data-placeholder]'));
      Form._generic_list_selector($("[data-special-field-type=\"generic_list_selector\"]"));
      Form._gmaps_location($("[data-special-field-type=\"gmaps_location\"]"));
      return Form._required($("[data-validation-required=\"\"]"));
    };

    Form._apply_datetime = function(field, args) {
      return new Datetime(field, args);
    };

    Form.parse_date_range_string = function(s) {
      var from_date, to_date;
      from_date = new Date();
      to_date = new Date();
      if (s === '+1w') {
        to_date.setDate(to_date.getDate() + 7);
      }
      return [from_date, to_date];
    };

    Form._datetime = function(f) {
      var _this = this;
      return f.each(function(index, _f) {
        var date_args, modifiers, _ref;
        modifiers = $(_f).attr('data-special-field-modifiers');
        date_args = {};
        if (modifiers === 'future') {
          date_args.min_date = new Date;
        } else if (modifiers === 'past') {
          date_args.max_date = new Date;
        } else if (is_string(modifiers)) {
          _ref = _this.parse_date_range_string(modifiers), date_args.min_date = _ref[0], date_args.max_date = _ref[1];
        }
        return new DatetimePicker($(_f), date_args);
      });
    };

    Form._date = function(f) {
      var _this = this;
      return f.each(function(index, _f) {
        var args, modifiers, _ref;
        modifiers = $(_f).attr('data-special-field-modifiers');
        args = {};
        if (modifiers === 'future') {
          args.min_date = new Date;
        } else if (modifiers === 'past') {
          args.max_date = new Date;
        } else if (is_string(modifiers)) {
          _ref = _this.parse_date_range_string(modifiers), args.min_date = _ref[0], args.max_date = _ref[1];
        }
        return new DatePicker($(_f), args);
      });
    };

    Form._time = function(f) {
      return f.each(function(index, _f) {
        return new TimePicker($(_f));
      });
    };

    Form._persistent_field = function(f) {
      return f.each()(function() {
        var t;
        t = $(this);
        return console.log(t);
      });
    };

    Form._generic_list_selector = function(f) {
      return f.each(function() {
        var callback, ls, t,
          _this = this;
        t = $(this);
        ls = null;
        callback = function(e) {
          return ls = new ListSelector(t);
        };
        return t.live('focus', callback);
      });
    };

    Form.clear_clearfield = function() {
      return $('[data-placeholder]').each(function() {
        var t;
        t = $(this);
        if (t.val() === t.attr('data-placeholder')) {
          return t.val('');
        }
      });
    };

    Form._gmaps_location = function(f) {
      return f.each(function(index, _f) {
        return _mp.location_autocomplete(_f);
      });
    };

    Form._clear_field = function(f) {
      var _f, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = f.length; _i < _len; _i++) {
        _f = f[_i];
        _f = $(_f);
        if (_f.is('textarea')) {
          _results.push(layout.labelize_placeholder(_f.parent()));
        } else {
          if (!_f.val()) {
            _f.val(_f.attr('data-placeholder'));
          }
          _results.push(_f.clearField({
            blurClass: "input_blured",
            activeClass: "input_active"
          }));
        }
      }
      return _results;
    };

    Form._clear_field_check = function(f) {
      if (f.val() === '') {
        return f.removeClass('input_active').addClass('input_blured');
      } else {
        return f.removeClass('input_blured').addClass('input_active');
      }
    };

    Form._confirm = function(a) {
      return a.live("click", function(e) {
        if (!confirm(a.attr("data-confirm"))) {
          e.preventDefault();
          return false;
        }
      });
    };

    Form._cpf = function(f) {
      return f.live("keyup", function(e) {
        var i, v, _v;
        v = $(e.target).val().replace(/[^0-9]/g, "");
        _v = "";
        i = 0;
        while (i < v.length) {
          if (i === 3 || i === 6) {
            _v += ".";
          } else {
            if (i === 9) {
              _v += "-";
            }
          }
          _v += v[i];
          i++;
        }
        if (_v.length === 3 || _v.length === 7) {
          _v += ".";
        } else {
          _v += "-";
        }
        if (_v.length === 11) {
          return $(e.target).val(_v);
        }
      });
    };

    Form._cnpj = function(f) {
      return f.live("keyup", function(e) {
        var i, v, _v;
        v = $(e.target).val().replace(/[^0-9]/g, "");
        _v = "";
        i = 0;
        while (i < v.length) {
          if (i === 2 || i === 5) {
            _v += ".";
          } else if (i === 8) {
            _v += "/";
          } else {
            if (i === 12) {
              _v += "-";
            }
          }
          _v += v[i];
          i++;
        }
        if (_v.length === 2 || _v.length === 6) {
          _v += ".";
        } else if (_v.length === 10) {
          _v += "/";
        } else {
          if (_v.length === 15) {
            _v += "-";
          }
        }
        return $(e.target).val(_v);
      });
    };

    Form._phone = function(f) {
      return f.live("focusout", function(e) {
        var offset, v;
        v = $(e.target).val().replace(/[^0-9]/g, "");
        if (v.length === 8) {
          return v = v.slice(0, 4) + "-" + v.slice(4, 8);
        } else if (v.length === 10) {
          return v = "(" + v.slice(0, 2) + ") " + v.slice(2, 6) + "-" + v.slice(6, 10);
        } else if (v.length > 10) {
          offset = v.length - 10;
          v = "+" + v.slice(0, offset) + " (" + v.slice(offset, offset + 2) + ") " + v.slice(offset + 2, offset + 6) + "-" + v.slice(offset + 6, offset + 10);
          return $(e.target).val(v);
        }
      });
    };

    Form._number = function(f) {
      return f.live("keyup", function(e) {
        var t;
        t = $(e.target);
        return t.val(t.val().replace(/[^0-9]/g, ""));
      });
    };

    Form._currency = function(f) {
      return f.live("keyup", function(e) {
        var t, v;
        t = $(e.target);
        v = parseInt(t.val().replace(/[^0-9]/g, "").replace(/^0+/g, "")).toString();
        if (isNaN(v) || v.length === 0) {
          return t.val('0.00');
        } else if (v.length === 1) {
          return t.val('0.0' + v);
        } else if (v.length === 2) {
          return t.val('0.' + v);
        } else {
          return t.val(v.slice(0, v.length - 2) + '.' + v.slice(v.length - 2, v.length));
        }
      });
    };

    Form._o_date = function(f) {
      var args, modifiers;
      modifiers = f.attr('data-special-field-modifiers');
      args = {};
      if (modifiers != null) {
        if (/past/.test(modifiers)) {
          args.maxDate = 0;
        } else if (/future/.test(modifiers)) {
          args.minDate = 0;
        }
      }
      return f.overlay_datepicker(args);
    };

    _adjust_caption = function(caption, target) {
      var o;
      caption.addClass("caption");
      o = target.offset();
      return caption.offset({
        top: o.top + target.height() + caption.height() / 4,
        left: o.left + (target.width() - caption.width() * 2) / 2
      });
    };

    Form._select_others = function(f) {
      return f.live("change", function(e) {
        var t;
        t = $(e.target);
        if (t.val() === "__outros__") {
          t.after("<input type=\"text\" name=\"" + t.attr("name") + "\" />                 <a class=\"action back_to_selection\"> voltar à seleção </a>");
        }
        t.hide();
        return _adjust_caption(t.siblings(".back_to_selection"), t.siblings("input"));
      });
    };

    Form._required = function(f) {
      return f.each(function() {
        return $("label[for=" + $(this).attr("name") + "]").css("font-weight", "bold");
      });
    };

    Form.pre_process = function() {
      $("a.back_to_selection").live("click", function(e) {
        var i, s, t;
        t = $(e.target);
        s = t.siblings("select");
        i = t.siblings("input");
        t.remove();
        s.show().attr("name", i.attr("name"));
        return i.remove();
      });
      return $.datepicker.setDefaults({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
      });
    };

    Form.__date = function(f) {
      return f.datepicker();
    };

    Form.__datetime = function(f) {
      var args, modifiers, overlay;
      modifiers = f.attr('data-special-field-modifiers');
      args = {};
      overlay = false;
      if (modifiers != null) {
        if (/overlay/.test(modifiers)) {
          overlay = true;
        }
        if (/past/.test(modifiers)) {
          args.maxDate = 0;
        } else if (/future/.test(modifiers)) {
          args.minDate = 0;
        }
      }
      if (overlay) {
        return f.overlay_datetimepicker(args);
      } else {
        return f.datetimepicker(args);
      }
    };

    Form.__time = function(f) {
      var args, modifiers, overlay;
      modifiers = f.attr('data-special-field-modifiers');
      args = {};
      overlay = false;
      if (modifiers != null) {
        if (/overlay/.test(modifiers)) {
          overlay = true;
        }
      }
      if (overlay) {
        return f.overlay_timepicker(args);
      } else {
        return f.timepicker(args);
      }
    };

    return Form;

  }).call(this);

}).call(this);
