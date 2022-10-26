import { useEffect, useState } from "react";
import { styleCard, styleNome, styleId, styleTipo } from '../../utils/poke_colors';
import { Pokemon } from "../../types/Pokemon";
import './styles.css';

function PokemonCard(props: Pokemon) {

    const pokemon = props;
    const [color, setColor] = useState('normal');

    useEffect(() => {
        setColor(props.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)
        //console.log(JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites))
    }, []);

    return (
        <div>
            <div className="card" key={1} style={styleCard(color)}>
                <p className="topCard">
                    <span className="nome" style={styleNome(color)}>{pokemon.name}</span>
                    <span className="id" style={styleId(color)}>#{pokemon.id}</span>
                </p>
                <div className="bottomCard">
                    <div>
                        <img className="card-img"
                            src={(JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).other['official-artwork'].front_default)}
                            alt={(JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default)}
                        />
                    </div>
                    <div className="tipos">
                        {(pokemon.pokemon_v2_pokemontypes.map(type =>
                            <p className="tipo" key={type.pokemon_v2_type.name}
                                style={styleTipo(type.pokemon_v2_type.name)}>{type.pokemon_v2_type.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard;