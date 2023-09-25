import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import styles from '../css/profile.module.css';
import { useNavigate } from 'react-router-dom';

export const ProfilePokemonTile = ({ pokemonId }) => {
	const pokemons = useSelector(selectAllPokemons);
	const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);
	const { id, picture, name, number } = pokemon;

	const navigate = useNavigate();
	const goToPokemon = () => {
		let path = '/pokemons/' + number;
		navigate(path);
	};

	return (
		<>
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
			<div className={styles.tile_delete}></div>
		</>
	);
};
