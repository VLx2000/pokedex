export type PokemonDetails = {
	id: number;
	name: string;
    weight: number;
    height: number;
    pokemon_v2_pokemonsprites: [{
        sprites: string
    }]
    pokemon_v2_pokemontypes: [{
        pokemon_v2_type: {
            name: string;
        }
    }]
    pokemon_v2_pokemonstats: [
        hp: {
            base_stat: string
        },
        ataque: {
            base_stat: string
        },
        defesa: {
            base_stat: string
        },
        ataque_especial: {
            base_stat: string
        },
        defesa_especial: {
            base_stat: string
        },
        velocidade: {
            base_stat: string
        }
    ]
    pokemon_v2_pokemonabilities: [{
        pokemon_v2_ability: {
            name: string;
        }
    }]
}
