import React, { Component } from 'react';
import './App.css';
import { Table, Filters } from './components';
import { getTypesAndWeaknesses, fetchPokemon } from './helpers';

const COLUMNS = ['id', 'name', 'type', 'weaknesses'];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            types: {},
            weaknesses: {},
            pokemon: [],
        }

        this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentWillMount() {
        fetchPokemon().then((data) => {
            const { types, weaknesses } = getTypesAndWeaknesses(data);

            this.setState({
                pokemon: data,
                types,
                weaknesses,
            })
        });
    }

    handleTextBoxChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleCheckboxChange(event, filterName) {
        const filter = this.state[filterName];
        const { name } = event.target;

        filter[name] = !filter[name];

        this.setState({
            [filterName]: filter,
        });
    }

    getFilteredPokemon() {
        const { name, pokemon, types, weaknesses } = this.state;
        let containsTypes;
        let containsWeaknesses;

        const selectedTypes = Object.keys(types).filter((x) => types[x]);
        const selectedWeaknesses = Object.keys(weaknesses).filter((x) => weaknesses[x]);

        return pokemon.filter((poke) => {
            let containsTypes = true;
            let containsWeaknesses = true;

            for (let i = 0; i < selectedTypes.length; i++) {
                if (!poke.type.includes(selectedTypes[i])) {
                    containsTypes = false;
                }
            }

            for (let i = 0; i < selectedWeaknesses.length; i++) {
                if (!poke.weaknesses.includes(selectedWeaknesses[i])) {
                    containsWeaknesses = false;
                }
            }

            return (
                poke.name.toLowerCase().includes(name)
                && containsTypes
                && containsWeaknesses
            );
        });
    }

    render() {
        const { types, weaknesses } = this.state;

        const filteredPokemon = this.getFilteredPokemon();

        return (
            <div>
                <Filters
                    handleCheckboxChange={this.handleCheckboxChange}
                    handleTextBoxChange={this.handleTextBoxChange}
                    types={types}
                    weaknesses={weaknesses} />
                <Table data={filteredPokemon} columns={COLUMNS} />
            </div>
        )
    }
}

export default App;
