json.extract!(pokemon, :id, :name, :attack, :defense, :image_url, :moves, :poke_type)
if show_pokemon_toys
    json.toys do 
      json.array!(pokemon.toys) do |toy|
         json.partial!("toys/toy", toy: toy)
      end
    end
end