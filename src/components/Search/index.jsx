import React, { useState } from "react";
import axios from "axios";
import { Form, FormControl, Button } from 'react-bootstrap';

function Search(props) {
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
        <Form className="d-flex" onSubmit={pesquisarPokemon}>
            <FormControl
                id="forms"
                type="search"
                placeholder="nome/número do pokémon"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
            />
            <Button variant="outline-success" type='submit'>Procurar</Button>
        </Form>
    )
}

export default Search;