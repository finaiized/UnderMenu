jQuery ->
	template = $("#templates .plates").detach()

	class Meal extends Backbone.Model
		defaults:
			"appetizer" : "Caesar Salad"
			"entree"    : "Ravioli"
			"dessert"   : "Cheesecake"

	class Meals extends Backbone.Collection
		model : Meal

	class Menu extends Backbone.View
		el: $("body")
		events: 
			"click a#add" : "addMeal"
		initialize: =>
			@collection = new Meals
			@collection.add new Meal
			@collection.bind "add", @render
			@render()
		render: =>
			i = @collection.length
			directives = 
				plateNum: ->
					return "Plate Number #" + i.toString()
			template.render @collection.at(@collection.length - 1).toJSON(), directives
			$("#meals").append template.clone()
		addMeal: =>
			@collection.add new Meal 
				"appetizer" : $("#appetizer").val() || "None"
				
	menus = new Menu
