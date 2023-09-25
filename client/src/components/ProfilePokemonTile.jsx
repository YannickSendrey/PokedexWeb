import React from 'react';
import styles from '../css/profile.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadFavoritePokemons } from '../features/PokemonBoard/pokemonBoardSlice';

export const ProfilePokemonTile = ({ pokemon }) => {
	const { picture, name, number } = pokemon;
	const userId = localStorage.getItem('userId');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const goToPokemon = () => {
		const path = '/pokemons/' + number;
		navigate(path);
	};

	const handleClick = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/api/pokemons/remove/${userId}/${number}`,
				{ method: 'DELETE' }
			);

			if (response.ok) {
				console.log('super');
				dispatch(loadFavoritePokemons(userId));
			}
		} catch (error) {
			console.error(error);
		}
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
			<div
				className={styles.tile_delete}
				onClick={handleClick}>
				Remove
			</div>
		</>
	);
};
