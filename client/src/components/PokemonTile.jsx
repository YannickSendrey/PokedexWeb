import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import styles from '../css/pokemonBoard.module.css';
import { useNavigate } from 'react-router-dom';

export const PokemonTile = ({ pokemonId }) => {
	const pokemons = useSelector(selectAllPokemons);
	const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);
	const { id, picture, name, number } = pokemon;

	const navigate = useNavigate();
	const goToPokemon = () => {
		let path = '/pokemons/' + number;
		navigate(path);
	};

	return (
		<div className={styles.tile}>
			<img
				src={picture}
				alt={`${name}`}
				className={styles.tile_img}
				onClick={goToPokemon}
			/>
			<p
				className={styles.tile_name}
				onClick={goToPokemon}>
				{name}
			</p>
		</div>
	);
};
