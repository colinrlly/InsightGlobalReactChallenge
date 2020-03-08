import React, { Component } from 'react';
import './App.css';
import { fetchPokemon } from './data';
import { useTable } from 'react-table';

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

        const columns = [{
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

        return (
            <Table columns={columns} data={pokemon} />
        )
    }
}

export default App;
