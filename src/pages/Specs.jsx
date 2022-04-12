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
						<div>{pokemon.nome}</div>
					)}
			</div>
		</div>
	);
}

export default Specs;