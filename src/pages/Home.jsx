import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from '@components/Navbar';
import PokemonCard from '@components/PokemonCard';
import PokeballGif from '@assets/pokeball.gif';
import './Home.css';

function Home() {

	const [lista_pokemon, setLista_pokemon] = useState('undefined');
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const loaderRef = useRef(null);

	useEffect(() => {
		var load = document.getElementById('loading');
		axios
			.get(`${process.env.REACT_APP_API_URL}pokemon`, {
				params: {
					limit: currentPage * 12,
				}
			})
			.then(response => {
				const data = response.data;
				if (data.results.length > 1126) {
					load.style = 'display: none';
					return;
				}
				//console.log(data.results);
				setLista_pokemon(data.results);
				setLoading(false);
			});
	}, [currentPage]);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		const observer = new IntersectionObserver((entities) => {
			const target = entities[0];

			if (target.isIntersecting) {
				setCurrentPage(old => old + 1);
			}
		}, options);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}
	}, []);

	return (
		<div id="home">
			<Navbar setLista_pokemon={setLista_pokemon}/>
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

export default Home;