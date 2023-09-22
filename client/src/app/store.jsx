import { configureStore } from '@reduxjs/toolkit';
import pokemonBoardReducer from '../features/PokemonBoard/pokemonBoardSlice';

export default configureStore({
    reducer: {
        pokemonBoard: pokemonBoardReducer,
    }
});