json.array!(@pokemon) do |pokemon|
    json.partial!("pokemon/pokemon", pokemon: pokemon, show_pokemon_toys: false)
end