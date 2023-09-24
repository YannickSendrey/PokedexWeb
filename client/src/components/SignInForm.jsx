import React, { useState } from 'react';
import styles from '../css/forms.module.css';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (event) => {
		const inputUsername = event.target.value;
		setUsername(inputUsername);
	};

	const handlePasswordChange = (event) => {
		const inputPassword = event.target.value;
		setPassword(inputPassword);
	};

	const handleSubmit = async () => {};

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
		</main>
	);
};
