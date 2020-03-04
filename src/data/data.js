import axios from 'axios';

const pokemonDataURL = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

export default async function fetchPokemon() {
    return await axios.get(pokemonDataURL).then((res) => res.data);
}
