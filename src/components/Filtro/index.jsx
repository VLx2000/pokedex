import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Accordion } from 'react-bootstrap';
import { padrao, desaturada, contrastada } from '@utils/poke_colors';
import './styles.css'

function Filtro(props) {

    const [lista_tipos, setLista_tipos] = useState('undefined');
    const [loading_tipos, setLoading_tipos] = useState(true);
    const [lista_geracoes, setLista_geracoes] = useState('undefined');
    const [loading_geracoes, setLoading_geracoes] = useState(true);
    const [lista_habitats, setLista_habitats] = useState('undefined');
    const [loading_habitats, setLoading_habitats] = useState(true);

    useEffect(() => {
        setLoading_tipos(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}type?limit=18`)
            .then(response => {
                const data = response.data;
                setLista_tipos(data.results);
                setLoading_tipos(false);
                //console.log(data);
            });
    }, []);

    useEffect(() => {
        setLoading_geracoes(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}generation`)
            .then(response => {
                const data = response.data;
                setLista_geracoes(data.results);
                setLoading_geracoes(false);
                //console.log(data);
            });
    }, []);

    useEffect(() => {
        setLoading_habitats(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}pokemon-habitat`)
            .then(response => {
                const data = response.data;
                setLista_habitats(data.results);
                setLoading_habitats(false);
                //console.log(data);
            });
    }, []);

    function pesquisarPokemon(search) {
        let selecionados = 'undefined';
        axios
            .get(`${process.env.REACT_APP_API_URL}` + search)
            .then(response => {
                const data = response.data;
                if (search.includes('type')) {
                    selecionados = data.pokemon.map(item => {
                        return { nome: item.pokemon.name, url: item.pokemon.url }
                    })
                }
                else if(search.includes('generation')) {
                    selecionados = data.pokemon_species.map(item => {
                        return { nome: item.name, url: item.url }
                    })
                }
                else if(search.includes('pokemon-habitat')) {
                    selecionados = data.pokemon_species.map(item => {
                        return { nome: item.name, url: item.url }
                    })
                }
                else {
                    console.log("Erro!");
                }
                //console.log(selecionados);
                props.setLista_pokemon(selecionados);
                let res = document.getElementById('resultados');
                res.innerHTML = selecionados.length + ' resultados <a href="/pokedex">Limpar</a>';
                res.style = "display: block;";
                document.getElementById('loading').style = 'display: none;';
            });
    }

    function styleBotao(color) {
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
                        {!loading_tipos && lista_tipos.map(tipo => (
                            <Button className="filtroBotao" variant="outline-dark" key={tipo.name} style={styleBotao(tipo.name)} 
                                onClick={() => pesquisarPokemon('type/' + tipo.name)}>{tipo.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Filtrar por geração</Accordion.Header>
                    <Accordion.Body>
                        {!loading_geracoes && lista_geracoes.map(geracao => (
                            <Button className="filtroBotao" variant="primary" key={geracao.name}
                                onClick={() => pesquisarPokemon('generation/' + geracao.name)}>{geracao.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Filtrar por habitat</Accordion.Header>
                    <Accordion.Body>
                        {!loading_habitats && lista_habitats.map(habitat => (
                            <Button className="filtroBotao" variant="warning" key={habitat.name}
                                onClick={() => pesquisarPokemon('pokemon-habitat/' + habitat.name)}>{habitat.name}
                            </Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default Filtro;