export type Pokemon = {
    id: number;
    name: string;
    pokemon_v2_pokemonsprites: [{
        sprites: string
    }]
    pokemon_v2_pokemontypes: [{
        pokemon_v2_type: {
            name: string;
        }
    }
    ]
}