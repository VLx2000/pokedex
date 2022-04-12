/* import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '@components/Navbar';
import PokeballGif from '@assets/pokeball.gif';

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
	}, []);

	return (
		<div id="home">
			<Navbar />
			<div className="container">
				<div id="resultados" style={{ display: 'none' }}></div>
				<div className="row">
					{!loading && lista_pokemon.map(pokemon => (
						<div key={pokemon.name} className='col-sm-6 col-lg-4 col-xl-3 mb-3'>
							<PokemonCard pokemon={pokemon} />
						</div>
					))}
					<p id="loading" ref={loaderRef}><img src={PokeballGif} alt="pokeball" width={64} /></p>
				</div>
			</div>
		</div>
	);
}

export default Specs; */