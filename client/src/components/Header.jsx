import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../css/header.module.css';
import { useNavigate } from 'react-router-dom';
import { loadAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import { useDispatch } from 'react-redux';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const goHome = () => {
		let path = '/pokemons';
		navigate(path);
		dispatch(loadAllPokemons());
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header_container_left}>
					<img
						src='/assets/pokeball.svg'
						alt='Pokeball Logo'
						className={styles.header_img}
						onClick={goHome}
					/>
				</div>
				<div className={styles.header_container_mid}>
					<h1
						className={styles.header_h1}
						onClick={goHome}>
						PokedexWeb
					</h1>
				</div>
				<div className={styles.header_container_right}>
					<div className={styles.header_button}>
						{/* login or logout check if user is connected */}
						<p className={styles.header_log}>Login</p>
					</div>
				</div>
			</header>
			<Outlet />{' '}
			{/* outlet is used in react-router to display the rest of our page below our header */}
		</>
	);
};
