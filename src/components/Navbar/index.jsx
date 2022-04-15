import { Nav, Navbar, Container } from 'react-bootstrap';
import { ReactComponent as GithubIcon } from '@assets/img/github.svg';
import Search from '@components/Search';
import './styles.css'

function Topbar(props) {
	return (
		<Navbar bg="dark" variant='dark' expand="lg" sticky="top">
			<Container>
				<a href="/pokedex">
					<h1 className='logo'>
						<img src="https://fontmeme.com/permalink/220407/3552117bf42964527c1f808e280e7bfc.png" 
							alt="Pokédex" border="0" width={110} />
					</h1>
				</a>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link className='pokedex-contact' href="https://github.com/VLx2000">
							<div className='pokedex-contact-container'>
								<GithubIcon width={20} />
								<p className='pokedex-contact-link'>/VLx2000</p>
							</div>
						</Nav.Link>
					</Nav>
					<Search setLista_pokemon={props.setLista_pokemon} />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Topbar;