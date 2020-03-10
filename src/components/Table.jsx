import React from 'react';

function Table({ data, columns }) {
    let keyCounter = 0;

    const headers = (
        <tr>
            {columns.map((column) => <th key={keyCounter++}>{column}</th>)}
        </tr>
    )

    const rows = data.map((row) => (
        <tr key={keyCounter++}>
            {columns.map((column) => <td key={keyCounter++}>{row[column]}</td>)}
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
