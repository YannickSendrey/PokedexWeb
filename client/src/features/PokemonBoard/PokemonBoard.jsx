import React, { useEffect, useState, useRef } from 'react';
import { loadAllPokemons } from './pokemonBoardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPokemons, selectIsLoading } from './pokemonBoardSlice';
import { PokemonTile } from '../../components/PokemonTile';
import { SearchInput } from '../../components/SearchInput';
import styles from '../../css/pokemonBoard.module.css';

export const PokemonBoard = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector(selectAllPokemons);
	const isLoading = useSelector(selectIsLoading);
	const [selectedRegion, setSelectedRegion] = useState('');
	const [isScrolling, setIsScrolling] = useState(false);
	const scrollTimeout = useRef(null);

	useEffect(() => {
		dispatch(loadAllPokemons(selectedRegion));
	}, [selectedRegion]);

	// hide SearchInput onScroll
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolling(true);
			clearTimeout(scrollTimeout.current);

			const timeout = setTimeout(() => {
				setIsScrolling(false);
			}, 500);

			scrollTimeout.current = timeout;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleSelectChange = (event) => {
		const value = event.target.value;
		setSelectedRegion(value);
	};

	return (
		<main className={styles.main}>
			<div className={styles.main_selectDiv}>
				<select
					name='region'
					id='region'
					onChange={handleSelectChange}
					className={styles.main_select}>
					<option value=''>Filter by region</option>
					<option value='kanto'>Kanto</option>
					<option value='johto'>Johto</option>
					<option value='hoenn'>Hoenn</option>
					<option value='sinnoh'>Sinnoh</option>
					<option value='unys'>Unys</option>
				</select>
				<p className={styles.main_select_text}>
					Hello{' '}
					{localStorage.getItem('username')
						? localStorage.getItem('username')
						: 'guest'}{' '}
					!
				</p>
			</div>
			<section className={styles.main_section}>
				{isLoading || !pokemons
					? 'Loading...'
					: pokemons.map((pokemon) => (
							<PokemonTile
								pokemonId={pokemon.id}
								key={pokemon.id}
							/>
					  ))}
			</section>
			<div
				className={`${styles.main_input} ${isScrolling ? styles.hidden : ''}`}>
				<SearchInput pokemons={pokemons} />
			</div>
		</main>
	);
};
