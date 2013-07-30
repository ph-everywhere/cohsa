// Generated by CoffeeScript 1.4.0
(function() {

  this.Scalator = {
    parse_scallable_objects: function() {
      this.parse_width_full_objects();
      this.parse_height_full_objects();
      return this.parse_children_equalized_height_objects();
    },
    parse_width_full_objects: function() {
      var _this = this;
      return $('.width_full').each(function(index, _element) {
        var t;
        t = $(_element);
        return _this.fill_width(t, t.children('.width_fixed'), t.children('.width_filler'));
      });
    },
    parse_height_full_objects: function() {
      var _this = this;
      return $('.height_full').each(function(index, _element) {
        var t;
        t = $(_element);
        return _this.fill_height(t, t.children('.height_fixed'), t.children('.height_filler'));
      });
    },
    parse_children_equalized_height_objects: function() {
      var _this = this;
      return $('[data-equalized-children-height]').each(function(index, _element) {
        var direction, t;
        t = $(_element);
        direction = t.attr('data-equalized-children-height');
        return _this.equalize_children_heights(t, '.height-equalization-reference', direction);
      });
    },
    equalize_children_heights: function(container, _refereces, direction) {
      var children, height_list, references, target_height;
      if (direction == null) {
        direction = 'max';
      }
      references = container.children(_refereces);
      children = container.children().not('.height-equalization-ignore');
      if (!(references.length > 0)) {
        if (!(children.length > 0)) {
          return;
        }
        references = children;
      }
      height_list = this.list_heights(references);
      if (direction === 'max') {
        target_height = Math.max.apply(Math, height_list);
      } else if (direction === 'min') {
        target_height = Math.min.apply(Math, height_list);
      }
      return children.innerHeight(target_height);
    },
    list_heights: function(elems) {
      var elem, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        elem = elems[_i];
        _results.push(parseFloat($(elem).innerHeight()));
      }
      return _results;
    },
    fill_width: function(container, fixed, filler) {
      var f, fillers_width, fixed_total_width, n, remaining_width, residual_width, _i, _len;
      fixed_total_width = 0.0;
      for (_i = 0, _len = fixed.length; _i < _len; _i++) {
        f = fixed[_i];
        fixed_total_width += parseFloat($(f).outerWidth());
      }
      remaining_width = container.width() - fixed_total_width;
      n = filler.length;
      fillers_width = Math.floor(remaining_width / n);
      residual_width = remaining_width - fillers_width * n;
      if (filler.length === 1) {
        fillers_width -= 1;
      }
      filler.slice(0, residual_width).outerWidth(fillers_width + 1);
      return filler.slice(residual_width, n).outerWidth(fillers_width);
    },
    fill_height: function(container, fixed, filler) {
      var container_height, f, fillers_height, fillers_height_candidate, fixed_total_height, free_height_filler, n, remaining_height, residual_height, _i, _len;
      fixed_total_height = 0;
      for (_i = 0, _len = fixed.length; _i < _len; _i++) {
        f = fixed[_i];
        fixed_total_height += $(f).outerHeight();
      }
      container_height = container.outerHeight();
      remaining_height = container_height - fixed_total_height;
      n = filler.length;
      fillers_height_candidate = Math.floor(remaining_height / n);
      filler.each(function(i, _t) {
        var min_height, t;
        t = $(_t);
        min_height = t.css('min-height');
        if ((min_height != null) && min_height > fillers_height_candidate) {
          t.outerHeight(min_height);
          remaining_height -= parseInt(min_height);
          return _t.addClass('filled_with_min_height');
        }
      });
      free_height_filler = filler.filter(':not(.filled_with_min_height)');
      n = free_height_filler.length;
      fillers_height = Math.floor(remaining_height / n);
      residual_height = remaining_height - fillers_height * n;
      free_height_filler.slice(0, residual_height).outerHeight(fillers_height + 1);
      free_height_filler.slice(residual_height, n).outerHeight(fillers_height);
      return filler.filter('line_height_filler').each(function() {
        return $(this).css('line-height', $(this).height() + 'px');
      });
    }
  };

}).call(this);
