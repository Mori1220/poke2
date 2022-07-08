import React, {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import {
  getAllPokemon,
  getPokemon,
} from '../services/pokemon';

export default function VerPokemon() {
    const [pokemonData, setPokemonData] = useState([])
    const [Bpoke, setBpoke] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [imgd, setIm] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  
  const [ver, setVer] = useState('true');

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
  
  setTimeout(() => {
    setVer(false);
    for(let i = 0; i <= pokemonData.length; i++ ){
    if(pokemonData[i].id == params.pokeID){
      setBpoke(pokemonData[i])
      setIm(pokemonData[i].sprites.other.dream_world.front_default);
    }
  } 
}, 500);

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



    let params = useParams();

    return (

            <div className="grid-container" >
                { ver ? (
              <p>Loading...</p>
            ) :  (
                <div>
                    <img width="100" height="100" src={imgd}/>
                  <br></br>
                      <h1>{Bpoke.name}</h1>
                        <p><b>Xp base: </b>{Bpoke.base_experience}</p>
                        <p><b>height: </b> {Bpoke.height}</p>
                        <p><b>weight: </b> {Bpoke.weight}</p>
                        
                </div>
                 )}    
            </div>
           
    )
}