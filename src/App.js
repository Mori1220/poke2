import './App.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  Outlet,
} from 'react-router-dom';

import {
  getAllPokemon,
  getPokemon,
} from './services/pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  return (
    <div>
      <nav style={{ paddingBottom: "1rem" }}>
          <Link to="/poke"><h1 className='nav'>Poke</h1></Link>
          {/* <Link to="/SearchPokemon"><h1 className='nav'>SearchPokemon</h1></Link> */}
          <Link to="/191465"><h1 className='nav'>191465</h1></Link>
        </nav>
        <Outlet />
    </div>
        
     
  
    
  );
}

export default App;