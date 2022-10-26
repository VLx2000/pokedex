import { useContext, useState } from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import { PokemonContext } from "../../context/lista_pokemon";
import { searchPokemon } from "../../utils/queries";
import axiosInstance from "../../config/axios";

function Search() {
    const context = useContext(PokemonContext);
    const [search, setSearch] = useState('');
	const [erro, setErro] = useState('sdfsd');

    function pesquisarPokemon(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (search !== '') {
            axiosInstance
                .post('', searchPokemon(search))
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    context?.setLista_pokemon(data.data.pokemon_v2_pokemon);
                    context?.setShowTotalResults(true);
                }).catch(err => 
                    alert('Não foi possível procurar o Pokemon devido a: ' + err)
                );
        }
    }

    function handleSearchChange(event: { target: { value: string; }; }) {
        setSearch(event.target.value.toLowerCase());
        //console.log(search);
    }

    return (
        <Form className="d-flex" onSubmit={pesquisarPokemon}>
            <FormControl
                id="forms"
                type="search"
                placeholder="nome do pokémon"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
            />
            <Button variant="outline-success" type='submit'>Procurar</Button>
        </Form>
    )
}

export default Search;