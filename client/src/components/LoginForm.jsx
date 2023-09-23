import React from 'react';
import styles from '../css/home.module.css';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const navigate = useNavigate();
	const goHome = () => {
		let path = '/pokemons';
		navigate(path);
	};

	const goRegister = () => {
		let path = '/register';
		navigate(path);
	};
	return (
		<main className={styles.main}>
			<div className={styles.main_div}>
				<div
					className={styles.main_innerDiv}
					onClick={goRegister}>
					Sign-up
				</div>
				<p className={styles.main_text}>
					Already Registered ? Click
					<a className={styles.main_link}> Here to sign-in !</a>
				</p>
			</div>

			<div className={styles.main_div}>
				<div
					className={styles.main_innerDiv}
					onClick={goHome}>
					Access as a guest
				</div>
				<p className={styles.main_text}>
					You won't have access to team-building feature...
				</p>
			</div>
		</main>
	);
};
