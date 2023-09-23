import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadOnePokemon, selectAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';

export const DetailedPokemon = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(loadOnePokemon(id));
    }, [])

    const pokemon = useSelector(selectAllPokemons);
    
}