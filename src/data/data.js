import axios from 'axios';

const pokemonDataURL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

export default function fetchPokemon() {
    return axios.get(pokemonDataURL).then((res) => res.data.pokemon);
}
