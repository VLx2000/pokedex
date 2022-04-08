import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';
import { colors } from '@utils/poke_colors';
import PokeballGif from '@assets/pokeball.gif';

function PokemonCard(props) {
    
    const pokemon = props.pokemon;
    const [stats, setStat] = useState();
    const [color, setColor] = useState('white');

    useEffect(() => {
        axios
            .get(pokemon.url)
            .then(response => {
                const data = response.data;
                //console.log(data);
                setStat(data);
                setColor(data.types[0].type.name)
            })
    }, [pokemon.url]);

    const pokemonColor = colors[color];

    return(
        <>
            {(typeof stats != 'undefined') ? 
                <div className="card" style={{borderColor: pokemonColor}}>
                    <p className="topCard">
                        <span className="nome" style={{color: pokemonColor}}>{pokemon.name}</span>
                        <span className="id" style={{backgroundColor: pokemonColor}}>#{stats.id}</span>
                    </p>
                    <img src={stats.sprites.other["official-artwork"].front_default} alt={stats.sprites.front_default} />
                    <p className="tipos">
                        {(stats.types.map(types =>  
                            <span className="tipo" key={types.type.name} style={{backgroundColor: colors[types.type.name]}}>{types.type.name}</span>
                        ))}
                    </p>
                </div>
            :   
                <div className="cardNCarregado"><img src={PokeballGif} alt="pokeball" width={256} /></div>
            }
        </>
    )
}

export default PokemonCard;