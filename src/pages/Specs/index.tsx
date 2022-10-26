import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import PokeballGif from '../../assets/pokeball.gif';
import axiosInstance from "../../config/axios";
import { styleCard, styleNome, styleId, styleTipo } from '../../utils/poke_colors';
import { PokemonDetails } from "../../types/PokemonDetails";
import { getPokemonDetails } from "../../utils/queries";
import './styles.css';

function Specs() {

	const { name } = useParams();

	const [pokemon, setPokemon] = useState<PokemonDetails>();
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState('normal');
	const [erro, setErro] = useState('');

	useEffect(() => {
		axiosInstance
			.post('', getPokemonDetails(name!))
			.then(response => {
				const data = response.data;
				//console.log(data);
				setPokemon(data.data.pokemon_v2_pokemon[0]);
				setColor(data.data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name);
				setLoading(false);
			}).catch(err => 
				setErro('Não foi possível listar o Pokemon devido a: ' + err)
			);
	}, [name]);

	return (
		<div id="specs" className="container">
			<Link to="/">Voltar</Link>
			{!loading ? ( pokemon &&
				<div className="infoSpecs">
					<div className="card" key={1} style={styleCard(color)}>
						<div className="topCard">
							<span className="nome" style={styleNome(color)}>{pokemon.name}</span>
							<span className="id" style={styleId(color)}>#{pokemon.id}</span>
						</div>
						<div className="infoCard">
							<div>
								<img className="card-img" 
									src={(JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).other['official-artwork'].front_default)}
									alt={(JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default)}
								/>
								<p>
									<span>Peso: {pokemon.weight} kg </span>
									<span>Altura: {pokemon.height} m</span>
								</p>
							</div>
							<div className="info">
								<p>{pokemon.pokemon_v2_pokemonstats[0].base_stat} hp</p>
								<p>{pokemon.pokemon_v2_pokemonstats[1].base_stat} ataque</p>
								<p>{pokemon.pokemon_v2_pokemonstats[2].base_stat} defesa</p>
								<p>{pokemon.pokemon_v2_pokemonstats[3].base_stat} ataque especial</p>
								<p>{pokemon.pokemon_v2_pokemonstats[4].base_stat} defesa especial</p>
								<p>{pokemon.pokemon_v2_pokemonstats[5].base_stat} velocidade</p>
								<div className="habilidades">Habilidades:
									{(pokemon.pokemon_v2_pokemonabilities.map(ability =>
										<p className="habilidade" key={ability.pokemon_v2_ability.name}>{ability.pokemon_v2_ability.name}</p>
									))}
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
				</div>
			) :
                <div className="cardNCarregado"><img src={PokeballGif} alt="pokeball" width={256} /></div>
			}
			{erro && <div>{erro}</div>}
		</div>
	);
}

export default Specs;