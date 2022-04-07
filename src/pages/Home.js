import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import './Home.css';
import Navbar from "../components/Navbar";
import PokeballGif from '../assets/pokeball.gif';

function Home() {

    const [lista_pokemon, setLista_pokemon] = useState('undefined');
    const [currentPage, setCurrentPage] = useState(1);
    const loaderRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}pokemon`, {
                params: {
                  limit: currentPage * 12,
                }
            })
            .then(response => {
                const data = response.data;
                //console.log(data.results.length);
                if (data.results.length > 1200){
                  document.getElementById('loading').innerHTML = "Os Pokemon acabaram";
                  return;
                }
                setLista_pokemon(data);
            });
    }, [currentPage]);

    useEffect(() => {
        const options = {
          root: null,
          rootMargin: "20px",
          threshold: 1.0
        };
    
        const observer = new IntersectionObserver((entities) => {
          const target = entities[0];
    
          if (target.isIntersecting){
            setCurrentPage(old => old + 1);
          }
        }, options);
    
        if (loaderRef.current){
          observer.observe(loaderRef.current);
        }
      }, []);
    
    return(
        <div id="home">
            <Navbar />
            <div className="container">
                <div className="row">
                    {typeof lista_pokemon.results != 'undefined' ? lista_pokemon.results.map(pokemon => (
                        <div key={pokemon.name} className='col-sm-6 col-lg-4 col-xl-3 mb-3'>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))
                    :
                        <div>Não foram achados Pokemon :(</div>
                    }
                    <p id="loading" ref={loaderRef}><img src={PokeballGif} alt="pokeball" width={64} /></p>
                </div>
            </div>
        </div>
    );
}

export default Home;