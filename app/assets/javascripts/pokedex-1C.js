Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
    var newPoke = new Pokedex.Models.Pokemon(attrs);
    newPoke.save({}, {
        success: function() {
            this.pokes.add(newPoke);
            this.addPokemonToList(newPoke);
            callback(newPoke);
        }.bind(this) 
    });
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
    event.preventDefault();
    var newPoke = $(event.currentTarget).serializeJSON();
    this.createPokemon(newPoke, this.renderPokemonDetail.bind(this));
    //, 
};


    // var currentPokemon = new Pokedex.Models.Pokemon({ id: pokeId })
    // currentPokemon.fetch({
//         success: function() {
//             this.renderPokemonDetail(currentPokemon);
//         }.bind(this)
//     });