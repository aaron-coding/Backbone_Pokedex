Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    }
    
    var pokes = this._pokemonIndex.collection;
    var poke = pokes.get(id) || new Pokedex.Models.Pokemon({id: id});  
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({model: poke, collection: pokes});
    this._pokemonDetail.refreshPokemon({success: callback});
    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el); // Here it's empty
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = this._pokemonIndex || new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({success: callback});
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {   
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    }
    // var toy = this.model.toys().get($(event.currentTarget).data("id"))
    var toy = this._pokemonDetail.model.toys().get(toyId)
    var detailView = new Pokedex.Views.ToyDetail({model: toy, collection: this._pokemonIndex.collection});
    $("#pokedex .toy-detail").html(detailView.$el);
    detailView.render();
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

