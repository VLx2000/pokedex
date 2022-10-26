import { createContext, useState } from "react";
import { HeadersDefaults } from 'axios';
import { Pokemon } from "../types/Pokemon";

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

interface PokemonContextInterface {
    loading?: boolean
    showTotalResults?: boolean
    setShowTotalResults: (set: boolean) => void
    listaPokemon: Pokemon[]
    setLista_pokemon: (lista: Pokemon[]) => void
}

export const PokemonContext = createContext<PokemonContextInterface | null>(null);

const PokemonProvider = ({ children }: any) => {

    const [listaPokemon, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [showTotalResults, setShowTotalResults] = useState(false);

    const setLista_pokemon = (lista: Pokemon[]) => {
        setPokemonList(lista);
        setLoading(false);
    }

    return (
        <PokemonContext.Provider
            value={{ listaPokemon, loading, showTotalResults, setLista_pokemon, setShowTotalResults }}>
            {children}
        </PokemonContext.Provider>
    );

}

export default PokemonProvider;