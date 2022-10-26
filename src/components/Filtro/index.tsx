import { useState, useEffect, useContext } from "react";
import { Container, Button, Accordion } from 'react-bootstrap';
import { padrao, desaturada, contrastada } from '../../utils/poke_colors';
import { PokemonContext } from "../../context/lista_pokemon";
import { 
    getFilteredByGenerationPokemonList, 
    getFilteredByHabitatPokemonList, 
    getFilteredByTypesPokemonList, 
    getFilters 
} from "../../utils/queries";
import axiosInstance from "../../config/axios";
import './styles.css'

type ListaFiltros = {
    name: string;
}

function Filtro() {
    const context = useContext(PokemonContext);

    const [loading, setLoading] = useState(true);
    const [lista_tipos, setLista_tipos] = useState<ListaFiltros[]>([]);
    const [lista_geracoes, setLista_geracoes] = useState<ListaFiltros[]>([]);
    const [lista_habitats, setLista_habitats] = useState<ListaFiltros[]>([]);
	const [erro, setErro] = useState('');

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .post('', getFilters())
            .then(response => {
                const data = response.data;
                setLista_tipos(data.data.pokemon_v2_type);
                setLista_geracoes(data.data.pokemon_v2_generation);
                setLista_habitats(data.data.pokemon_v2_pokemonhabitatname);
                setLoading(false);
                //console.log(data);
            });
    }, []);

    function filtrarPokemon(search: string, tipoFiltro: string) {
        let filtro;
        if (tipoFiltro == 'tipo') {
            filtro = getFilteredByTypesPokemonList(search);
        } else if (tipoFiltro == 'geracao') {
            filtro = getFilteredByGenerationPokemonList(search);
        } else {
            filtro = getFilteredByHabitatPokemonList(search);
        }
        axiosInstance
            .post('', filtro)
            .then(response => {
                const data = response.data;
                //console.log(data);
                context?.setLista_pokemon(data.data.pokemon_v2_pokemon);
                context?.setShowTotalResults(true);
            }).catch(err => 
				setErro('Não foi possível listar os Pokemon devido a: ' + err)
			);
    }

    function styleBotao(color: string) {
        const corPadrao = padrao(color);
        const corContrastada = contrastada(color);
        const corDesaturada = desaturada(color);
        return {
            backgroundColor: corPadrao,
            color: corContrastada,
            borderColor: corDesaturada,
        }
    }

    return (
        <Container>
            <Accordion className="filtro" defaultActiveKey="none" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filtrar por tipo</Accordion.Header>
                    <Accordion.Body>
                        {!loading && lista_tipos.map(tipo => (
                            <Button className="filtroBotao" variant="outline-dark" key={tipo.name} style={styleBotao(tipo.name)}
                                onClick={() => filtrarPokemon(tipo.name, 'tipo')}>{tipo.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Filtrar por geração</Accordion.Header>
                    <Accordion.Body>
                        {!loading && lista_geracoes.map(geracao => (
                            <Button className="filtroBotao" variant="primary" key={geracao.name}
                                onClick={() => filtrarPokemon(geracao.name, 'geracao')}>{geracao.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Filtrar por habitat</Accordion.Header>
                    <Accordion.Body>
                        {!loading && lista_habitats.map(habitat => (
                            <Button className="filtroBotao" variant="warning" key={habitat.name}
                                onClick={() => filtrarPokemon(habitat.name, 'habitat')}>{habitat.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {erro && <div>{erro}</div>}
        </Container>
    )
}

export default Filtro;