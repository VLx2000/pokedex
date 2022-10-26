export function getPokemonList(currentPage: number) {
  return {
    query: `query samplePokeAPIquery($page: Int!) {
            pokemon_v2_pokemon(limit: $page) {
              id
              name
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }`,
    variables: {
      page: currentPage * 24,
    }
  }
}

export function getPokemonDetails(nomePokemon: string) {
  return {
    query: `query samplePokeAPIquery($nome: String!) {
          pokemon_v2_pokemon(where: {name: {_eq: $nome}}) {
            id
            name
            height
            weight
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
              }
            }
            pokemon_v2_pokemonstats {
              base_stat
            }
            
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
    variables: {
      nome: nomePokemon,
    }
  }
}

export function getFilters() {
  return {
    query: `query samplePokeAPIquery {
        pokemon_v2_type {
          name
        }
        pokemon_v2_generation {
          name
        }
        pokemon_v2_pokemonhabitatname {
          name
        }
      }`
  }
}

export function getFilteredPokemonList(pokemonfilter: string) {
  return {
    query: `query samplePokeAPIquery($filter: String!) {
          pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $filter}}}}, order_by: {id: asc}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
    variables: {
      filter: pokemonfilter,
    }
  }
}

export function getFilteredByTypesPokemonList(pokemonfilter: string) {
  return {
    query: `query samplePokeAPIquery($filter: String!) {
          pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $filter}}}}, order_by: {id: asc}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
    variables: {
      filter: pokemonfilter,
    }
  }
}

export function getFilteredByGenerationPokemonList(pokemonfilter: string) {
  return {
    query: `query samplePokeAPIquery($filter: String!) {
          pokemon_v2_pokemon(where: {pokemon_v2_pokemonspecy: {pokemon_v2_generation: {name: {_eq: $filter}}}}, order_by: {id: asc}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
    variables: {
      filter: pokemonfilter,
    }
  }
}

export function getFilteredByHabitatPokemonList(pokemonfilter: string) {
  return {
    query: `query samplePokeAPIquery($filter: String!) {
          pokemon_v2_pokemon(where: {pokemon_v2_pokemonspecy: {pokemon_v2_pokemonhabitat: {name: {_eq: $filter}}}}, order_by: {id: asc}) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }`,
    variables: {
      filter: pokemonfilter,
    }
  }
}

export function searchPokemon(pokemonName: string) {
  return {
    query: `query samplePokeAPIquery($nome: String!) {
        pokemon_v2_pokemon(where: {name: {_regex: $nome}}) {
          id
          name
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`,
    variables: {
      nome: pokemonName,
    }
  }
}
