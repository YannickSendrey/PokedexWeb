import React, { useEffect } from 'react';
import { loadAllPokemons } from './pokemonBoardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemons, selectIsLoading } from './pokemonBoardSlice';
import { PokemonTile } from '../../components/PokemonTile';

export const PokemonBoard = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(selectAllPokemons);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(loadAllPokemons());
        console.log(pokemons, 'oui');
        }, [dispatch]);
    
    console.log(pokemons);
    if (isLoading || !Array.isArray(pokemons)) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <select name="" id=""></select>
            {pokemons.map((pokemon) => (
                <PokemonTile
                    pokemonId={pokemon.id}
                    key={pokemon.id}
                />
            ))}
        </main>
    )
}