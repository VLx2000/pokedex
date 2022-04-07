import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { ReactComponent as GithubIcon } from '../../assets/img/github.svg';
import './styles.css'

function Topbar() {
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
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="filtrar por nome/número..."
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Procurar</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Topbar;