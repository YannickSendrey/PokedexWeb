import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadFavoritePokemons,
	selectFavoritePokemons,
} from '../features/PokemonBoard/pokemonBoardSlice';

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const username = localStorage.getItem('username');
	const id = localStorage.getItem('userId');
	const favoritePokemons = useSelector(selectFavoritePokemons);

	useEffect(() => {
		if (!localStorage.getItem('username')) {
			navigate('/sign-in');
		}
		dispatch(loadFavoritePokemons(id));
	}, []);

	return (
		<main>
			<p>Hello {username} !</p>
		</main>
	);
};
