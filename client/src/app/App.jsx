import './App.css';
import React, { useEffect } from 'react';
import { loadAllPokemons, loadOnePokemon } from '../features/PokemonBoard/pokemonBoardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOnePokemon(50));
  }, [dispatch]);

  const pokemons = useSelector(selectAllPokemons);
  console.log(pokemons);
  return (
    <main>
      <p>oui</p>
    </main>
  )
}

export default App
