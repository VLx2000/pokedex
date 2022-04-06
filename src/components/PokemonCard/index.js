import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import { colors } from "../../utils/poke_colors";

const PokemonCard = (props) => {
    
    const pokemon = props.pokemon;
    const [stats, setStat] = useState();
    const [color, setColor] = useState('white');

    useEffect(() => {
        axios
            .get(pokemon.url)
            .then(response => {
                const data = response.data;
                console.log(data);
                setStat(data);
                setColor(data.types[0].type.name)
            })
    }, [pokemon.url]);

    const cardColor = {
        backgroundColor: colors[color],
    };

    return(
        <>
            {(typeof stats != 'undefined') ? 
                <div className="card" style={cardColor}>
                    <p className="topCard">
                        <span className="nome">{pokemon.name}</span>
                        <span className="id">Nº {stats.id}</span>
                    </p>
                    <img src={stats.sprites.other["official-artwork"].front_default} alt="" />
                    <p className="tipos">
                        {(stats.types.map(types =>  
                            <span className="tipo" key={types.type.name} style={{backgroundColor: colors[types.type.name]}}>{types.type.name}</span>
                        ))}
                    </p>
                </div>
            :   
                <div>Carregando...</div>
            }
        </>
    )
}

export default PokemonCard;