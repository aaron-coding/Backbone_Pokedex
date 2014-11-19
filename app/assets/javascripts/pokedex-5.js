Pokedex.Views = {};

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li" : "selectPokemonFromList" 
  },

  initialize: function() {
    this.$el = $(".pokemon-list");
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function(pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function(options) {
    this.collection.fetch({
      success: function() {
        this.render();
        if (options.success){
          options.success();          
        }
      }.bind(this)
    });
  },

  render: function(){
    this.$el.empty();
    this.collection.each(function (el) {
      this.addPokemonToList(el);   
    }.bind(this))
  },

  selectPokemonFromList: function (event) {
    var pokeId = $(event.currentTarget).data("id")
    Backbone.history.navigate('pokemon/'+ pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  // className: "myClass",
  events: {
    "click .toys li": "selectToyFromList"
  },
  
  refreshPokemon: function (options) {
    this.model.fetch({
      success: function(){
        this.render();
        if (options.success){
          options.success();          
        }
      }.bind(this)
    })
    // this.render({})
  },

  render: function () {
    this.$el.html(JST["pokemonDetail"]({pokemon: this.model}));
    this.model.toys().each(function(el){
      this.$el.find(".toys").append(JST["toyListItem"]({toy: el, pokes: this.collection}))
    }.bind(this));

  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data("id")
    Backbone.history.navigate('pokemon/'+ this.model.id + '/toys/' + toyId ,  { trigger: true });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    this.$el.html(JST["toyDetail"]({toy: this.model, pokes: this.collection}))
  }
});

// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

