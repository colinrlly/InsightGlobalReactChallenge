import React from 'react';
import './App.css';
import { fetchPokemon } from './data';

function App() {
    fetchPokemon();

    return (
        <div className="App">
            <h1>hello</h1>
        </div>
    );
}

export default App;
