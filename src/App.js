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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            pokemon: [],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetchPokemon().then((data) => {
            this.setState({
                pokemon: data,
            })
        });
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getFilteredPokemon() {
        const { query, pokemon } = this.state;

        return pokemon.filter((x) => x.name.toLowerCase().includes(query));
    }

    render() {
        const pokemon = this.getFilteredPokemon();

        return (
            <div>
                <input
                    type='text'
                    name='query'
                    value={this.state.query}
                    onChange={this.handleChange} />
                <Table columns={COLUMNS} data={pokemon} />
            </div>
        )
    }
}

export default App;
