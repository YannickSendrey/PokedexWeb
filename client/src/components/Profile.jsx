import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavoritePokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import { ProfilePokemonTile } from './ProfilePokemonTile';
import styles from '../css/profile.module.css';

export const Profile = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem('username');
	const favoritePokemons = useSelector(selectFavoritePokemons);

	useEffect(() => {
		if (!localStorage.getItem('username')) {
			navigate('/sign-in');
		}
	}, []);

	return (
		<main className={styles.profile}>
			<p className={styles.profile_p}>Hello {username} !</p>
			<h2 className={styles.profile_section_h2}>Your team :</h2>
			<section className={styles.profile_section}>
				{/* render 6 tiles, fill them with <ProfilePokemonTile depending on favoritePokemons.length */}
				{(() => {
					const pokemonTiles = [];
					for (let i = 0; i < 6; i++) {
						const pokemon = favoritePokemons[i];
						pokemonTiles.push(
							<div
								className={styles.tile}
								key={i}>
								{pokemon && <ProfilePokemonTile pokemon={pokemon} />}
							</div>
						);
					}
					return pokemonTiles;
				})()}
			</section>
		</main>
	);
};

/* onClick dispatch(delete from State + requête delete API) */
