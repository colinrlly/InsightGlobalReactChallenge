import React, { Component } from 'react';
import './App.css';
import { fetchPokemon } from './data';
import { useTable } from 'react-table';

const COLUMNS = [{
    Header: 'Pokedex',
    columns: [
        {
            Header: 'num',
            accessor: 'num',
        },
        {
            Header: 'name',
            accessor: 'name',
        },
        {
            Header: 'type',
            accessor: 'type',
        },
        {
            Header: 'weaknesses',
            accessor: 'weaknesses',
        },
    ],
}];

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

function getTypesAndWeaknesses(pokemon) {
    const totalTypes = {};
    const totalWeaknesses = {};
    let type = [];
    let weaknesses = [];
    let poke = {};

    for (let i = 0; i < pokemon.length; i++) {
        poke = pokemon[i];
        type = poke.type;
        weaknesses = poke.weaknesses;

        for (let j = 0; j < type.length; j++) {
            if (!(type[j] in totalTypes)) {
                totalTypes[type[j]] = false;
            }
        }

        for (let j = 0; j < weaknesses.length; j++) {
            if (!(weaknesses in totalWeaknesses)) {
                totalWeaknesses[weaknesses[j]] = false;
            }
        }
    }

    return {
        types: totalTypes,
        weaknesses: totalWeaknesses,
    }
}

function Filters({ handleCheckboxChange, handleTextBoxChange, types, weaknesses }) {
    const typeCheckboxes = Object.keys(types).map((type) => (
        <label>
            {type}:
            <input
                type='checkbox'
                name={type}
                onChange={(e) => { handleCheckboxChange(e, 'types') }} />
        </label>
    ));

    const weaknessCheckboxes = Object.keys(weaknesses).map((weakness) => (
        <label>
            {weakness}:
            <input
                type='checkbox'
                name={weakness}
                onChange={(e) => { handleCheckboxChange(e, 'weaknesses') }} />
        </label>
    ));

    return (
        <form>
            <label>
                name:
                <input
                    type='text'
                    name='name'
                    onChange={handleTextBoxChange} />
            </label>
            {typeCheckboxes}
            {weaknessCheckboxes}
        </form>
    )
}

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
                <Table columns={COLUMNS} data={filteredPokemon} />
            </div>
        )
    }
}

export default App;
