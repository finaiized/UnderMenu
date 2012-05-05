(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  jQuery(function() {
    var Meal, Meals, Menu, menus, template;
    template = $("#templates .plates").detach();
    Meal = (function(_super) {

      __extends(Meal, _super);

      function Meal() {
        Meal.__super__.constructor.apply(this, arguments);
      }

      Meal.prototype.defaults = {
        "appetizer": "Caesar Salad",
        "entree": "Ravioli",
        "dessert": "Cheesecake"
      };

      return Meal;

    })(Backbone.Model);
    Meals = (function(_super) {

      __extends(Meals, _super);

      function Meals() {
        Meals.__super__.constructor.apply(this, arguments);
      }

      Meals.prototype.model = Meal;

      return Meals;

    })(Backbone.Collection);
    Menu = (function(_super) {

      __extends(Menu, _super);

      function Menu() {
        this.addMeal = __bind(this.addMeal, this);
        this.render = __bind(this.render, this);
        this.initialize = __bind(this.initialize, this);
        Menu.__super__.constructor.apply(this, arguments);
      }

      Menu.prototype.el = $("body");

      Menu.prototype.events = {
        "click a#add": "addMeal"
      };

      Menu.prototype.initialize = function() {
        this.collection = new Meals;
        this.collection.add(new Meal);
        this.collection.bind("add", this.render);
        return this.render();
      };

      Menu.prototype.render = function() {
        var directives, i;
        i = this.collection.length;
        directives = {
          plateNum: function() {
            return "Plate Number #" + i.toString();
          }
        };
        template.render(this.collection.at(this.collection.length - 1).toJSON(), directives);
        return $("#meals").append(template.clone());
      };

      Menu.prototype.addMeal = function() {
        return this.collection.add(new Meal({
          "appetizer": $("#appetizer").val() || "None"
        }));
      };

      return Menu;

    })(Backbone.View);
    return menus = new Menu;
  });

}).call(this);
