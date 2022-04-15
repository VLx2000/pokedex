import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { styleCard, styleNome, styleId, styleTipo } from '@utils/poke_colors';
import './styles.css';

function Specs() {

	const { name } = useParams();

	const [pokemon, setPokemon] = useState('undefined');
	const [loading, setLoading] = useState(true);
	const [color, setColor] = useState('normal');

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}pokemon/` + name)
			.then(response => {
				const data = response.data;
				//console.log(data);
				setPokemon(data);
				setColor(data.types[0].type.name)
				setLoading(false);
			});
	}, [name]);

	return (
		<div id="specs" className="container">
			<Link to="/pokedex">Voltar</Link>
			{!loading && (
				<div className="infoSpecs">
					<div className="card" key={1} style={styleCard(color)}>
						<div className="topCard">
							<span className="nome" style={styleNome(color)}>{pokemon.name}</span>
							<span className="id" style={styleId(color)}>#{pokemon.id}</span>
						</div>
						<div className="infoCard">
							<div>
								<img className="card-img" alt={pokemon.sprites.front_default}
									src={pokemon.sprites.other["official-artwork"].front_default} />
								<p>
									<span>Peso: {pokemon.weight} kg </span>
									<span>Altura: {pokemon.height} m</span>
								</p>
							</div>
							<div className="info">
								<p>{pokemon.stats[0].base_stat} hp</p>
								<p>{pokemon.stats[1].base_stat} ataque</p>
								<p>{pokemon.stats[2].base_stat} defesa</p>
								<p>{pokemon.stats[3].base_stat} ataque especial</p>
								<p>{pokemon.stats[4].base_stat} defesa especial</p>
								<p>{pokemon.stats[5].base_stat} velocidade</p>
								<div className="habilidades">Habilidades:
									{(pokemon.abilities.map(abilities =>
										<p className="habilidade" key={abilities.ability.name}>{abilities.ability.name}</p>
									))}
								</div>
								<div className="tipos">
									{(pokemon.types.map(types =>
										<p className="tipo" key={types.type.name}
											style={styleTipo(types.type.name)}>{types.type.name}</p>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

			)}
		</div>
	);
}

export default Specs;