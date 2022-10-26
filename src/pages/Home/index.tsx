import { useEffect, useState, useRef, useContext } from "react";
import Navbar from '../../components/Navbar';
import Filtro from '../../components/Filtro';
import PokemonCard from '../../components/PokemonCard';
import PokeballGif from '../../assets/pokeball.gif';
import axiosInstance from "../../config/axios";
import { Link } from 'react-router-dom';
import { PokemonContext } from "../../context/lista_pokemon";
import { getPokemonList } from "../../utils/queries";
import './styles.css';

function Home() {

	const context = useContext(PokemonContext);
	const loaderRef = useRef(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [showButton, setShowButton] = useState(true);
	const [erro, setErro] = useState('');

	useEffect(() => {
		axiosInstance
			.post('', getPokemonList(currentPage))
			.then(response => {
				const data = response.data;
				//console.log(data);
				context?.setLista_pokemon(data.data.pokemon_v2_pokemon);
				context?.setShowTotalResults(false);
			}).catch(err => 
				setErro('Não foi possível listar os Pokemon devido a: ' + err)
			);
	}, [currentPage]);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};
		
		const observer = new IntersectionObserver((entities) => {
			const target = entities[0];

			if (target.isIntersecting && !context?.loading) {
				setCurrentPage(old => old + 1);
			}
		}, options);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}
	}, [context?.loading]);

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
			<Navbar />
			<Filtro />
			<div className="container">
				{context?.showTotalResults && <div id="resultados">{context?.listaPokemon.length} selecionados <a href="/">Limpar</a></div>}
				<div className="row">
					{!context?.loading && context?.listaPokemon.map(pokemon => (
						<div key={pokemon.id} className='col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3'>
							<Link to={"/pokemon/" + pokemon.name}>
								<PokemonCard {...pokemon} />
							</Link>
						</div>
					))}
					{!context?.showTotalResults && !erro && <p id="loading" ref={loaderRef}><img src={PokeballGif} alt="pokeball" width={64} /></p>}
					{erro && <div>{erro}</div>}
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