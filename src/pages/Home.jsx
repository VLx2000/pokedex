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
	const [showButton, setShowButton] = useState(false);

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

	/* https://www.kindacode.com/article/how-to-create-a-scroll-to-top-button-in-react/ */
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	/***/

	return (
		<div id="home">
			<Navbar setLista_pokemon={setLista_pokemon}/>
			<div className="container">
				<div id="resultados" style={{ display: 'none' }}></div>
				<div className="row">
					{!loading && lista_pokemon.map(pokemon => (
						<div key={pokemon.name} className='col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3'>
							<PokemonCard pokemon={pokemon} />
						</div>
					))}
					<p id="loading" ref={loaderRef}><img src={PokeballGif} alt="pokeball" width={64} /></p>
				</div>
			</div>
			{showButton && (
				<button onClick={scrollToTop} className="back-to-top">
					&#8593;
				</button>
			)}
		</div>
	);
}

export default Home;