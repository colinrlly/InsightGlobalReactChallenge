import React from 'react';

const COLUMNS = ['id', 'name', 'type', 'weaknesses'];

function Table({ data }) {
    let keyCounter = 0;

    const headers = (
        <tr>
            {COLUMNS.map((column) => <th key={keyCounter++}>{column}</th>)}
        </tr>
    )

    const rows = data.map((row) => (
        <tr key={keyCounter++}>
            {COLUMNS.map((column) => <td key={keyCounter++}>{row[column]}</td>)}
        </tr>
    ));

    return (
        <table>
            <thead>
                {headers}
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default Table;
