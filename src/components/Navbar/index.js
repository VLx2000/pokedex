import React, { useState } from "react";
import axios from "axios";
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { ReactComponent as GithubIcon } from '../../assets/img/github.svg';
import './styles.css'

function Topbar(props) {

	const [search, setSearch] = useState('');

	function pesquisarPokemon(event) {
		event.preventDefault();
		axios
			.get(`${process.env.REACT_APP_API_URL}pokemon?limit=2000`)
			.then(response => {
				const data = response.data;
				let selecionados = data.results.filter(pokemon => 
					pokemon.name.includes(search) || pokemon.url.substring(33,).includes(search));
				props.setLista_pokemon(selecionados);
				//console.log(selecionados)
				let res = document.getElementById('resultados');
				res.innerHTML = selecionados.length + ' resultados <a href="/pokedex">Limpar</a>';
				res.style = "display: block;";
				document.getElementById('loading').style = 'display: none;';
			});
	}

	function handleSearchChange(event) {
		setSearch(event.target.value.toLowerCase());
	}

	return (
		<Navbar bg="dark" variant='dark' expand="lg" sticky="top">
			<Container>
				<Navbar.Brand href="/pokedex">
					<h1>
						<img src="https://fontmeme.com/permalink/220407/3552117bf42964527c1f808e280e7bfc.png" alt="Pokédex" border="0" />
					</h1>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link className='pokedex-contact' href="https://github.com/VLx2000">
							<div className='pokedex-contact-container'>
								<GithubIcon />
								<p className='pokedex-contact-link'>/VLx2000</p>
							</div>
						</Nav.Link>
					</Nav>
					<Form className="d-flex" onSubmit={pesquisarPokemon}>
						<FormControl
							id="forms"
							type="search"
							placeholder="filtrar por nome/número..."
							className="me-2"
							aria-label="Search"
							onChange={handleSearchChange}
						/>
						<Button variant="outline-success" type='submit'>Procurar</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Topbar;