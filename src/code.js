$(document).ready(function () {
    var Meal = Backbone.Model.extend({
        defaults: {
            "appetizer": "Caesar Salad",
            "entree": "Ravioli",
            "dessert": "Cheesecake"
        }
    });

    var Meals = Backbone.Collection.extend({
        model: Meal
    });

    var Menu = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'addMeal'
        },
        template: _.template($("#template-menu").html()),
        initialize: function () {
            _.bindAll(this, 'render', 'addMeal');
            this.collection = new Meals();
            this.collection.add(new Meal());
            this.collection.bind('add', this.render);
            this.render();
        },
        render: function () {
            var html = this.template({
                meals: this.collection.toJSON()
            });
            $('ol', this.el).html(html);

        },

        addMeal: function () {
            console.log("Added meal");
            this.collection.add(new Meal({
                'appetizer': $('#appetizer').val() || "None"
            }));
        }
    });

    var menus = new Menu();

});