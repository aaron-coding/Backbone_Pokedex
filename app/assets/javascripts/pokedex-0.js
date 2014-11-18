(function (){
    window.Pokedex = (window.Pokedex || {});
    window.Pokedex.Models = {};
    window.Pokedex.Collections = {};

    Pokedex.Models.Pokemon = Backbone.Model.extend({
        urlRoot: "/pokemon",
        toys: function(){
            if (!this._toys) {
                this._toys = new Pokedex.Collections.PokemonToys([], { pokemon: this });
            }
            return this._toys;
        },
        parse: function(payload){ //payload is JSON Obj
            if (payload.toys){
                this.toys().add(payload.toys);
                delete payload.toys;
            }
            return payload;
        }
    });

    Pokedex.Models.Toy = Backbone.Model.extend({
        urlRoot: "/toys"
    });

    Pokedex.Collections.Pokemon = Backbone.Collection.extend({
        model: Pokedex.Models.Pokemon,
        url: "/pokemon"
    }); 

    Pokedex.Collections.PokemonToys = Backbone.Collection.extend ({
        model: Pokedex.Models.Toy,
        initialize: function (models, attrs) {
            this.pokemon = attrs.pokemon;
        },
        url: function () {
            return this.pokemon.url() + "/toys";
        }
    }); 

    window.Pokedex.Test = {
      testShow: function (id) {
        var pokemon = new Pokedex.Models.Pokemon({ id: id });
        pokemon.fetch({
          success: function () {
            console.log(pokemon.toJSON());
          }
        });
      },

      testIndex: function () {
        var pokemon = new Pokedex.Collections.Pokemon();
        pokemon.fetch({
          success: function () {
            console.log(pokemon.toJSON());
          }
        });
      }
    };

    window.Pokedex.RootView = function ($el) {
      this.$el = $el;
      this.pokes = new Pokedex.Collections.Pokemon();
      this.$pokeList = this.$el.find('.pokemon-list');
      this.$pokeDetail = this.$el.find('.pokemon-detail');
      this.$newPoke = this.$el.find('.new-pokemon');
      this.$toyDetail = this.$el.find('.toy-detail');
      this.$pokeList.on("click", ".poke-list-item", this.selectPokemonFromList.bind(this));
      this.$newPoke.on("submit", this.submitPokemonForm.bind(this));
    };

    $(function() {
      var $rootEl = $('#pokedex');
    	window.Pokedex.rootView = new Pokedex.RootView($rootEl);
      window.Pokedex.rootView.refreshPokemon();
    })
})();
