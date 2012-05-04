$(document).ready(function () {
    var template = $("#templates .plates").detach();
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
            'click a#add': 'addMeal'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'addMeal');
            this.collection = new Meals();
            this.collection.add(new Meal());
            this.collection.bind('add', this.render);
            this.render();
        },
        render: function () {
            var i = this.collection.length;
            var directives = {
                plateNum: function() {
                    return "Plate Number #" + ((i).toString());   
                }
            };
            console.log(this.collection.at(this.collection.length - 1).toJSON());
            template.render(this.collection.at(this.collection.length - 1).toJSON(), directives);
            $("#meals").append(template.clone());
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