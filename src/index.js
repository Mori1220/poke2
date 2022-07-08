import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Poke from './routes/poke';
import VerPokemon from './routes/pokeid';
import SearchPokemon from './routes/SearchPokemon';
import Student from './routes/Student';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element= { <App /> } >
          <Route path="/poke" element = {<Poke/>}>
            <Route path=":pokeID" element = { <VerPokemon/> } />
          </Route>
          <Route path="/SearchPokemon" element= { <SearchPokemon/> } >
          </Route>

          <Route path="/191465" element = { <Student/> } ></Route>
          <Route path="*" element = {
            <main style={{ padding: "1rem" }}>
              
            </main>
          }/>
        </Route>
      </Routes>    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();