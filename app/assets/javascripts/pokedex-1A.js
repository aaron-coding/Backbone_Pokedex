Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
    // debugger
    var stringToAdd = $("<li>")
        .text(pokemon.get("name"), pokemon.get("poke_type"))
        .addClass("poke-list-item")
        .attr("data-id", pokemon.get("id"))
    this.$pokeList.append(stringToAdd);    
};

Pokedex.RootView.prototype.refreshPokemon = function (callback) {
    this.pokes.fetch({
        success: function() {
            this.pokes.each(this.addPokemonToList.bind(this));
        }.bind(this)
    });

};

