import React from 'react';
import styles from '../../css/home.module.css';

export const Home = () => {
	return (
		<main className={styles.main}>
			<div className={styles.main_sign}>
				<div className={styles.main_sign_div}>Sign-up</div>
				<p className={styles.main_sign_text}>
					Already Registered ? Click{' '}
					<a className={styles.main_sign_link}>Here to sign-in !</a>
				</p>
			</div>

			<div className={styles.main_guest}>
				<div className={styles.main_guest_div}>Access as a guest</div>
				<p className={styles.main_guest_text}>
					You won't have access to team-building feature...
				</p>
			</div>
		</main>
	);
};
