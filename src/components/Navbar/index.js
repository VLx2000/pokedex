import {ReactComponent as GithubIcon} from '../../assets/img/github.svg';
import './styles.css'

function Navbar() {
	return (
		<header>
			<nav className='container'>
				<div className='pokedex-nav-content'>
					<a className='navbar-brand' href="/">
						<h1>Pokédex <img src="https://emoji.gg/assets/emoji/pokeball.png" width="32px" height="32px" alt="pokeball" /></h1>
					</a>
					<input type="text" placeholder='filtrar...'/>
					<a href="https://github.com/VLx2000">
						<div className='pokedex-contact-container'>
							<GithubIcon />
							<p className='pokedex-contact-link'>/VLx2000</p>
						</div>
					</a>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;