import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Profile = () => {
	const username = localStorage.getItem('username');
	const id = localStorage.getItem('userId');

	return (
		<main>
			<p>Hello {username} !</p>
		</main>
	);
};
