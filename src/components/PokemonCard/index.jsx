import React, { useEffect, useState } from "react";
import axios from "axios";
import Radium from 'radium';
import './styles.css';
import { padrao, desaturada, contrastada } from '@utils/poke_colors';
import PokeballGif from '@assets/pokeball.gif';

function PokemonCard(props) {
    
    const pokemon = props.pokemon;
    const [stats, setStat] = useState();
    const [color, setColor] = useState('normal');

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

    const corPadrao = padrao(color);
    const corDesaturada = desaturada(color);
    const corContrastada = contrastada(color);    

    const styleCard = {
        borderColor: corPadrao,
        ':hover': { boxShadow: "0 0 15px 10px" + corDesaturada, },
        ':active': { boxShadow: "0 0 15px 8px" + corPadrao, },
    }

    const styleNome = {
        color: corContrastada,
    }

    const styleId = {
        backgroundColor: corPadrao, color: corContrastada,
    }

    function styleTipo(color) {
        return {backgroundColor: desaturada(color), color: contrastada(color),}
    }

    return(
        <>
            {(typeof stats != 'undefined') ? 
                <div className="card" style={styleCard}>
                    <p className="topCard">
                        <span className="nome" style={styleNome}>{pokemon.name}</span>
                        <span className="id" style={styleId}>#{stats.id}</span>
                    </p>
                    <img src={stats.sprites.other["official-artwork"].front_default} alt={stats.sprites.front_default} />
                    <p className="tipos">
                        {(stats.types.map(types =>  
                            <span className="tipo" key={types.type.name} 
                                style={styleTipo(types.type.name)}>{types.type.name}</span>
                        ))}
                    </p>
                </div>
            :   
                <div className="cardNCarregado"><img src={PokeballGif} alt="pokeball" width={256} /></div>
            }
        </>
    )
}

export default Radium(PokemonCard);