import React, { Component } from 'react';
import './App.css';
import { fetchPokemon } from './data';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
        }
    }

    componentDidMount() {
        fetchPokemon().then((data) => {
            this.setState({
                pokemon: data,
            })
        });
    }

    render() {
        const { pokemon } = this.state;

        const pokemonElements = pokemon.map((x) => (<li>{x.num} {x.name} {x.type} {x.weaknesses}</li>))

        return (
            <div className="App"> 
                <ul>
                    {pokemonElements}
                </ul>
            </div>
        );
    }
}

export default App;
