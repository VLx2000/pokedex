import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '@components/Navbar';

function Specs(props) {

	const pokemonId = props.pokemon;
	const [pokemon, setPokemon] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		var load = document.getElementById('loading');
		axios
			.get(`${process.env.REACT_APP_API_URL}pokemon` + pokemonId)
			.then(response => {
				const data = response.data;
				if (data.results.length > 1126) {
					load.style = 'display: none';
					return;
				}
				//console.log(data.results);
				setPokemon(data.results);
				setLoading(false);
			});
	}, [pokemonId]);

	return (
		<div id="specs">
			<Navbar />
			<div className="container">
				{!loading && (
					<div>{pokemon.nome}
						{/* <p>Peso: {atributos.weight} </p>
						<p>Altura: {atributos.height} </p>
						<p>{atributos.stats[0].base_stat}hp</p>
						<p>{atributos.stats[1].base_stat}ataque</p>
						<p>{atributos.stats[2].base_stat}defesa</p>
						<p>{atributos.stats[3].base_stat}ataque especial</p>
						<p>{atributos.stats[4].base_stat}defesa especial</p>
						<p>{atributos.stats[5].base_stat}velocidade</p> */}
					</div>
				)}
			</div>
		</div>
	);
}

export default Specs;