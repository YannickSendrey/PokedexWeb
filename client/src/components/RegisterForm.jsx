import React, { useState } from 'react';
import styles from '../css/forms.module.css';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const goSignIn = () => {
		let path = '/sign-in';
		navigate(path);
	};
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [credentialsMatchesSecurityCheck, setCredentialsMatchesSecurityCheck] =
		useState(false);
	const [spanColors, setSpanColors] = useState({
		characters: 'white',
		lowercase: 'white',
		uppercase: 'white',
		number: 'white',
		special: 'white',
	});
	const [registerError, setRegisterError] = useState({
		usernameAlreadyExists: false,
		passwordAlreadyExists: false,
	});

	// what minimum security user credentials has to meet
	const usernameRegex = /^[a-zA-Z0-9]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
	const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

	const handleUsernameChange = (event) => {
		// storing in intermdiate variable so setState async delay doesnt affect our match check
		const inputUsername = event.target.value;
		setUsername(inputUsername);

		if (inputUsername.match(usernameRegex) && password.match(passwordRegex)) {
			setCredentialsMatchesSecurityCheck(true);
		} else {
			setCredentialsMatchesSecurityCheck(false);
		}
	};

	const handlePasswordChange = (event) => {
		// storing in intermdiate variable so setState async delay doesnt affect our match check
		const inputPassword = event.target.value;
		setPassword(inputPassword);

		if (username.match(usernameRegex) && inputPassword.match(passwordRegex)) {
			setCredentialsMatchesSecurityCheck(true);
		} else {
			setCredentialsMatchesSecurityCheck(false);
		}
	};

	// if credentials are ok -> goHome and post to API / else help user know why
	const handleSubmit = async () => {
		if (credentialsMatchesSecurityCheck === true) {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: username, password: password }),
			};

			try {
				const response = await fetch(
					'http://127.0.0.1:8000/api/users/register',
					requestOptions
				);
				if (response.ok) {
					goSignIn();
				} else if (response.status === 303) {
					const jsonResponse = await response.json();
					console.log(jsonResponse);
					if (jsonResponse === 'This User already exists...') {
						setRegisterError({
							usernameAlreadyExists: true,
							passwordAlreadyExists: true,
						});
					}

					if (jsonResponse === 'A user with this Username already exists...') {
						setRegisterError({
							passwordAlreadyExists: false,
							usernameAlreadyExists: true,
						});
					}
					if (jsonResponse === 'A user with this Password already exists...') {
						setRegisterError({
							usernameAlreadyExists: false,
							passwordAlreadyExists: true,
						});
					}
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			let newColors = { ...spanColors };

			if (password.length < 8) {
				newColors.characters = 'red';
			} else {
				newColors.characters = 'green';
			}

			if ([...password].some((char) => char === char.toLowerCase())) {
				newColors.lowercase = 'green';
			} else {
				newColors.lowercase = 'red';
			}

			if ([...password].some((char) => char === char.toUpperCase())) {
				newColors.uppercase = 'green';
			} else {
				newColors.uppercase = 'red';
			}

			if (/\d/.test(password)) {
				newColors.number = 'green';
			} else {
				newColors.number = 'red';
			}

			if (!password.match(specialCharacterRegex)) {
				newColors.special = 'red';
			} else {
				newColors.special = 'green';
			}

			setSpanColors(newColors);
		}
	};

	return (
		<main className={styles.main}>
			<p className={styles.main_header}>Register</p>
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
					<span style={{ color: spanColors.characters }}>
						- 8 characters
					</span>{' '}
					<br />
					<span style={{ color: spanColors.lowercase }}>
						- 1 lowercase{' '}
					</span>{' '}
					<br />
					<span style={{ color: spanColors.uppercase }}>
						- 1 uppercase{' '}
					</span>{' '}
					<br />
					<span style={{ color: spanColors.number }}>- 1 number</span>
					<br />
					<span style={{ color: spanColors.special }}>
						- 1 special character (* / $ @ ! ...)
					</span>
				</p>
			</div>

			<div className={styles.main_div}>
				<div
					className={`${styles.main_innerDiv} ${styles.main_innerDiv_button}`}
					onClick={handleSubmit}>
					<p className={styles.main_link}>Register me !</p>
				</div>
				<p
					className={`${styles.main_usernameError} ${styles.main_text}`}
					style={{
						display: registerError.usernameAlreadyExists ? 'block' : 'none',
					}}>
					A user with this Username already exists...
				</p>
				<p
					className={`${styles.main_passwordError} ${styles.main_text}`}
					style={{
						display: registerError.passwordAlreadyExists ? 'block' : 'none',
					}}>
					A user with this Password already exists...
				</p>
			</div>
		</main>
	);
};
