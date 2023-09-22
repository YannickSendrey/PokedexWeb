import './App.css';
import React, { useEffect } from 'react';
import { loadAllPokemons, loadOnePokemon } from '../features/PokemonBoard/pokemonBoardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import { PokemonBoard } from '../features/PokemonBoard/PokemonBoard';

function App() {

  return (
    <PokemonBoard />
  )
}

export default App
