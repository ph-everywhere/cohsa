// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.TabSelector = (function() {

    function TabSelector(args) {
      this.unselect_all = __bind(this.unselect_all, this);

      this.click_menu_item = __bind(this.click_menu_item, this);
      this.unselect_all($(args.menu));
      $(args.menu).on('click', '[data-tab-selector]', this.click_menu_item);
      if (args.selected == null) {
        this.select($(args.menu + ' [data-tab-selector]:first'));
      } else {
        this.select($(args.menu + ' [data-tab-selector=' + args.selected + ']'));
      }
    }

    TabSelector.prototype.click_menu_item = function(event) {
      return this.select($(event.target));
    };

    TabSelector.prototype.unselect_all = function(menu) {
      return $('[data-tab-selector]', menu).each(function() {
        $($(this).attr('data-tab-selector')).hide();
        return $(this).removeClass('tab-selector-selected');
      });
    };

    TabSelector.prototype.select = function(tab) {
      this.unselect_all(tab.parent());
      $(tab.attr('data-tab-selector')).show();
      return tab.addClass('tab-selector-selected');
    };

    return TabSelector;

  })();

}).call(this);
