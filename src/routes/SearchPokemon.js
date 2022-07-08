import React, {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  Outlet,
  useSearchParams,
} from 'react-router-dom';

export default function SearchPokemon() {
  
      let [searchParams, setSearchParams] = useSearchParams();
      const [result, setResult] = useState([]);
      const [poke, setPoke] = useState([]);
      const [load, setLoad] = useState('true');
      const arr = [];
  
      useEffect(() => {
          fetch('https://pokeapi.co/api/v2/pokemon/?limit=400')
              .then((response) => response.json())
              .then((data) => setResult(
                  data.results.map((item) => {
                      fetch(item.url)
                          .then((response) => response.json())
                          .then((allpokemon) => arr.push(allpokemon));
                      setPoke(arr);
                  }),
              ));
      }, []);
  
      setTimeout(() => {
          setLoad(false);
          document.body.style.backgroundColor = '#a5e7fa';
      }, 2000);
  
        return (
          <main>
             <div className='pokegallery'>
             <h1>Search pokemon by Name :
             <input value={searchParams.get('filter') || ""}
                  onChange={(event) =>{
                      let filter = event.target.value;
                      if (filter) {
                          setSearchParams({ filter });
                      }else{
                          setSearchParams({});
                      }
                  }}
              />
             </h1>
             
              <br></br>
              { load ? (
                <p>Loading...</p>
              ) :  (
                poke.filter((pokemon) => {
                  let filter = searchParams.get('filter');
                  if (!filter) return true;
                  let name = pokemon.name.toLowerCase();
                  return name.startsWith(filter.toLowerCase());
                }).map((pokemon, i) => (
                    <div className='containertotal'>
                      <Link to={"/buscarPokemon/" + pokemon.id}>
                        <div className='card' id={pokemon.types[0].type.name}  name={pokemon.types[0].type.name}>
                          <p className='ids'>Id: {pokemon.id} </p>
                          <p className='ids1'>Type: {pokemon.types[0].type.name.toUpperCase()}</p>
                          <br></br>
                          <h3><b>{pokemon.name.toUpperCase()}</b></h3>
                          <img className='imagen' src={pokemon.sprites.other.dream_world.front_default}/>
                        </div>
                      </Link>
                    </div>
                ))
              )}
              <Outlet/>
            </div>
            </main>  
        );
      }