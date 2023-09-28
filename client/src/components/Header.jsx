import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../css/header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadAllPokemons } from '../features/PokemonBoard/pokemonBoardSlice';
import { useDispatch } from 'react-redux';
import { API_URL } from '../utils/constant';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	let path = '';

	const goHome = () => {
		path = '/pokemons';
		navigate(path);
		dispatch(loadAllPokemons());
	};
	const goSignIn = () => {
		path = '/sign-in';
		navigate(path);
	};

	const goProfile = () => {
		path = '/profile';
		navigate(path);
	};

	const goLogOut = async () => {
		let path = '/';
		try {
			const response = await fetch(`${API_URL}/users/logout`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('username');
				localStorage.removeItem('userId');

				navigate(path);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const isUserLoggedIn = JSON.parse(localStorage.getItem('accessToken'))
		? true
		: false;

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
						<p
							className={styles.header_log}
							onClick={isUserLoggedIn ? goLogOut : goSignIn}>
							{isUserLoggedIn ? 'Logout' : 'Login'}
						</p>
					</div>
				</div>
			</header>
			<div
				className={`${styles.header_button} ${styles.header_profile}`}
				/* only display profile button if user logged in and not already on profile page */
				style={{
					display:
						isUserLoggedIn && location.pathname !== '/profile'
							? 'block'
							: 'none',
				}}>
				<p
					className={styles.header_log}
					onClick={goProfile}>
					Profile
				</p>
			</div>
			<Outlet />{' '}
			{/* outlet is used in react-router to display the rest of our page below our header */}
		</>
	);
};
