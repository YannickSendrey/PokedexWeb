import React, { useEffect, useState } from 'react';
import { loadAllPokemons } from './pokemonBoardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemons, selectIsLoading } from './pokemonBoardSlice';
import { PokemonTile } from '../../components/PokemonTile';
import { SearchInput } from '../SearchInput/SearchInput';

export const PokemonBoard = () => {
    const dispatch = useDispatch();
    let pokemons = useSelector(selectAllPokemons);
    const isLoading = useSelector(selectIsLoading);
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        dispatch(loadAllPokemons(selectedRegion));
        }, [selectedRegion]);
    

    const handleSelectChange = (event) => {
        const value = event.target.value; 
        setSelectedRegion(value);
    }



    return (
        <main>
            <SearchInput />
            <select name="region" id="region" onChange={handleSelectChange}>
                <option value="">Filter by region</option>
                <option value="kanto">Kanto</option>
                <option value="johto">Johto</option>
                <option value="hoenn">Hoenn</option>
                <option value="sinnoh">Sinnoh</option>
                <option value="unys">Unys</option>
            </select>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                pokemons.map((pokemon) => (
                <PokemonTile
                    pokemonId={pokemon.id}
                    key={pokemon.id}
                />
            )))}
            <SearchInput />
        </main>
    )
}