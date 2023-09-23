import React, { useState } from 'react';
import styles from '../../css/forms.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const goHome = () => {
		let path = '/pokemons';
		navigate(path);
	};
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [credentialsMatchesSecurityCheck, setCredentialsMatchesSecurityCheck] =
		useState(false);

	console.log(credentialsMatchesSecurityCheck);

	// what minimum security user credentials has to meet
	const usernameRegex = /^[a-zA-Z0-9]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
	const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);

		if (username.match(usernameRegex) && password.match(passwordRegex)) {
			setCredentialsMatchesSecurityCheck(true);
		} else {
			setCredentialsMatchesSecurityCheck(false);
		}
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);

		if (username.match(usernameRegex) && password.match(passwordRegex)) {
			setCredentialsMatchesSecurityCheck(true);
		} else {
			setCredentialsMatchesSecurityCheck(false);
		}
	};

	// if credentials are ok -> goHome and post to API / else help user know why
	const handleSubmit = () => {
		if (credentialsMatchesSecurityCheck === true) {
			goHome();
		} else {
			if (password.length < 8) {
				document.querySelector('#characters').style.color = 'red';
			} else {
				document.querySelector('#characters').style.color = 'green';
			}

			if ([...password].some((char) => char === char.toLowerCase())) {
				document.querySelector('#lowercase').style.color = 'green';
			} else {
				document.querySelector('#lowercase').style.color = 'red';
			}

			if ([...password].some((char) => char === char.toUpperCase())) {
				document.querySelector('#uppercase').style.color = 'green';
			} else {
				document.querySelector('#uppercase').style.color = 'red';
			}

			if (!password.match(specialCharacterRegex)) {
				document.querySelector('#special').style.color = 'red';
			} else {
				document.querySelector('#special').style.color = 'green';
			}
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.main_div}>
				<input
					type='text'
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_input}`}
					placeholder='Choose your Username'
					value={username}
					onChange={handleUsernameChange}></input>
				<p className={styles.main_text}>only alphanumerical characters</p>
			</div>

			<div className={styles.main_div}>
				<input
					type='text'
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_input}`}
					placeholder='Choose your Password'
					value={password}
					onChange={handlePasswordChange}></input>
				<p className={styles.main_text}>
					atleast : <br />
					<span id='characters'>- 8 characters</span> <br />
					<span id='lowercase'>- 1 lowercase </span> <br />
					<span id='uppercase'>- 1 uppercase </span> <br />
					<span id='special'>- 1 special character (* / $ @ ! ...)</span>
				</p>
			</div>

			<div className={styles.main_div}>
				<div
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_button}`}
					onClick={handleSubmit}>
					<p className={styles.main_link}>Register me !</p>
				</div>
			</div>
		</main>
	);
};
