import React, { useState } from 'react';
import styles from '../css/forms.module.css';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [signInError, setSignInError] = useState(false);

	const goHome = () => {
		let path = '/pokemons';
		navigate(path);
	};

	const handleUsernameChange = (event) => {
		const inputUsername = event.target.value;
		setUsername(inputUsername);
	};

	const handlePasswordChange = (event) => {
		const inputPassword = event.target.value;
		setPassword(inputPassword);
	};

	const handleSubmit = async () => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: username, password: password }),
		};

		try {
			const response = await fetch(
				'http://127.0.0.1:8000/api/users/sign-in',
				requestOptions
			);
			if (response.ok) {
				const jsonResponse = await response.json();
				localStorage.setItem('accessToken', JSON.stringify(jsonResponse.token));
				localStorage.setItem('username', jsonResponse.user.username);
				localStorage.setItem('userId', jsonResponse.user.id);
				goHome();
				// stockage de la session etc
			} else if (response.status === 404) {
				const jsonResponse = await response.json();
				setSignInError(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className={styles.main}>
			<p className={styles.main_header}>Sign in</p>
			<div className={styles.main_div}>
				<input
					type='text'
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_input}`}
					placeholder='Enter your Username'
					value={username}
					onChange={handleUsernameChange}></input>
			</div>

			<div className={styles.main_div}>
				<input
					type='text'
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_input}`}
					placeholder='Choose your Password'
					value={password}
					onChange={handlePasswordChange}></input>
			</div>

			<div className={styles.main_div}>
				<div
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_button}`}
					onClick={handleSubmit}>
					<p className={styles.main_link}>Log me in !</p>
				</div>
			</div>
			<p
				className={`${styles.main_passwordError} ${styles.main_text} ${styles.main_signInError}`}
				style={{
					display: signInError ? 'block' : 'none',
				}}>
				No User matches these credentials
			</p>
		</main>
	);
};
