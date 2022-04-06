import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import './Home.css';

function Home() {

    const [lista_pokemon, setLista_pokemon] = useState('undefined');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}pokemon?offset=0&limit=102`)
            .then(response => {
                const data = response.data;
                //console.log(data);
                setLista_pokemon(data);
            });
    }, [])
    
    return(
        <div id="home">
            <div className="container">
                <div className="row">
                    {typeof lista_pokemon.results != 'undefined' ? lista_pokemon.results.map(pokemon => (
                        <div key={pokemon.name} className='col-sm-6 col-lg-4 col-xl-3 mb-3'>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))
                    :
                        <div>Carregando...</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;