import React from 'react';
import styles from '../css/profile.module.css';
import { useNavigate } from 'react-router-dom';

export const ProfilePokemonTile = ({ pokemon }) => {
	const { picture, name, number } = pokemon;

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
				#{number} {name}
			</p>
			<div className={styles.tile_delete}>Delete</div>
		</>
	);
};
