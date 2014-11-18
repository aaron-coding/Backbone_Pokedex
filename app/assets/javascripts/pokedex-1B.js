Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
    var tag = $("<div class='details'>");
    var pokeKeys = pokemon.keys();
    for (var i = 0; i < pokeKeys.length; i++) {
        var key = pokeKeys[i];
        if (key === "image_url") {
          tag.prepend("<img src=" + pokemon.get(key) +"><br>")
        } else if (pokemon.get(key) instanceof Array ){
          tag.append(key, ": ", pokemon.get(key).join(", "), "<br>");
        } else {
          tag.append(key, ": ", pokemon.get(key), "<br>");
        }
    }
    // pokemon.keys.forEach(function() {
    //     
    // })
    this.$pokeDetail.html(tag);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
    event.preventDefault();
    var pokeId = $(event.currentTarget).data("id");
    this.renderPokemonDetail(this.pokes.get(pokeId))
    

    // var currentPokemon = new Pokedex.Models.Pokemon({ id: pokeId })
    // currentPokemon.fetch({
//         success: function() {
//             this.renderPokemonDetail(currentPokemon);
//         }.bind(this)
//     });
};
