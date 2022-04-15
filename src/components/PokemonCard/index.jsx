import React, { useEffect, useState } from "react";
import axios from "axios";
import Radium from 'radium';
import './styles.css';
import { padrao, desaturada, contrastada } from '@utils/poke_colors';
import PokeballGif from '@assets/pokeball.gif';

function PokemonCard(props) {

    const pokemon = props.pokemon;
    const [atributos, setAtributos] = useState();
    const [color, setColor] = useState('normal');
    const [virar, setVirar] = useState(false);

    useEffect(() => {
        const url = pokemon.url.replace('-species', '');
        axios
            .get(url)
            .then(response => {
                const data = response.data;
                //console.log(data);
                setAtributos(data);
                setColor(data.types[0].type.name)
            })
    }, [pokemon.url]);

    const corPadrao = padrao(color);
    const corDesaturada = desaturada(color);
    const corContrastada = contrastada(color);

    const styleCard = {
        borderColor: corPadrao,
        backgroundColor: corDesaturada,
        ':hover': { boxShadow: "0 0 15px 10px" + corPadrao, },
        ':active': { boxShadow: "0 0 15px 8px" + corContrastada, },
    }

    const styleNome = {
        color: corContrastada,
    }

    const styleId = {
        backgroundColor: corPadrao, color: corContrastada,
    }

    function styleTipo(color) {
        return {
            backgroundColor: padrao(color),
            color: contrastada(color),
        }
    }

    return (
        <>
            {(typeof atributos != 'undefined') ?
                <div>
                    <div className="card" key={1} style={styleCard} onClick={() => setVirar(!virar)}>
                        <p className="topCard">
                            <span className="nome" style={styleNome}>{pokemon.name}</span>
                            <span className="id" style={styleId}>#{atributos.id}</span>
                        </p>
                        <div className="bottomCard">
                            <div>
                                <img className="card-img" src={atributos.sprites.front_default} alt={atributos.sprites.other["official-artwork"].front_d} />
                            </div>
                            <div className="tipos">
                                {(atributos.types.map(types =>
                                    <p className="tipo" key={types.type.name}
                                        style={styleTipo(types.type.name)}>{types.type.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="cardNCarregado"><img src={PokeballGif} alt="pokeball" width={256} /></div>
            }
        </>
    )
}

export default Radium(PokemonCard);