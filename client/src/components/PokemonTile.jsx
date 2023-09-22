import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllPokemons } from "../features/PokemonBoard/pokemonBoardSlice";
import styles from '../css/pokemonBoard.module.css';

export const PokemonTile = ({ pokemonId }) => {
    const pokemons = useSelector(selectAllPokemons);
    const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);
    const { id, picture, name } = pokemon;
    const alt = `Picture of ${name}`;

    return (
        <div>
            <img src={picture} alt={alt} />
            <p>{name}</p>
        </div>
    )
}