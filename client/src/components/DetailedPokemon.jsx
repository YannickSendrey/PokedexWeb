import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../utils/constant';
import {
	loadOnePokemon,
	selectOnePokemon,
} from '../features/PokemonBoard/pokemonBoardSlice';
import styles from '../css/detailedPokemon.module.css';

export const DetailedPokemon = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(loadOnePokemon(id));
	}, []);

	// get info from pokemon and its type(s)
	const pokemon = useSelector(selectOnePokemon);
	const types = pokemon.types;

	// extract types and change desc backgroundColor depending on type(s)
	const getTypeColor = () => {
		const typeColorArray = [];
		if (types && types.length > 0) {
			types.forEach((type) => typeColorArray.push(type.color));
		}

		let typeColor = '';

		if (typeColorArray.length === 1) {
			typeColor = typeColorArray[0];
		} else if (typeColorArray.length === 2) {
			const [type1Color, type2Color] = typeColorArray;
			typeColor = `linear-gradient(90deg, ${type1Color} 0%, ${type1Color} 50%, ${type2Color} 50%, ${type2Color} 100%)`;
		} else {
			typeColor = 'black';
		}

		return typeColor;
	};

	// handle statsBars size and color
	const getStatpercentage = (stat) => {
		return (stat * 100) / 255;
	};
	const backgroundColor = (stat) => {
		if (stat < 30) return 'rgba(233, 60, 25, 0.418)';
		if (stat < 60) return 'rgba(231, 132, 19, 0.675)';
		if (stat < 90) return 'rgba(224, 213, 13, 0.646)';
		if (stat < 120) return 'rgba(13, 224, 80, 0.502)';
		if (stat < 150) return 'rgba(13, 104, 42, 0.602)';
		if (stat < 256) return 'rgba(21, 48, 203, 0.702)';
	};

	// handle addPokemonToFavorite if user logged in
	const handleClick = async (event) => {
		const userId = localStorage.getItem('userId');

		try {
			// get pokemons from user, if he has'nt this pokemon in fav, addToFav
			const data = await fetch(`${API_URL}/users/${userId}/favorites`);
			const json = await data.json();
			const isPokemonInFavorites = json.filter(
				(userPokemon) => userPokemon.number === pokemon.number
			);

			if (isPokemonInFavorites.length === 0) {
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						pokemonId: pokemon.number,
						userId: userId,
					}),
				};

				try {
					const response = await fetch(
						`${API_URL}/pokemons/add`,
						requestOptions
					);

					if (response.ok) {
						// green response if ok
						event.target.style.backgroundColor = 'green';

						setTimeout(() => {
							event.target.style.backgroundColor = 'rgba(75, 99, 133, 0.262)';
						}, 1000);
					} else {
						event.target.style.backgroundColor = 'red';

						setTimeout(() => {
							event.target.style.backgroundColor = 'rgba(75, 99, 133, 0.262)';
						}, 1000);
					}
				} catch (error) {
					console.error(error);
				}
			} else {
				// red response if ko
				event.target.style.backgroundColor = 'red';

				setTimeout(() => {
					event.target.style.backgroundColor = 'rgba(75, 99, 133, 0.262)';
				}, 1000);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handlePreviousClick = () => {
		let newPokemonNumber;
		if (pokemon.number === 1) {
			newPokemonNumber = 649;
		} else {
			newPokemonNumber = pokemon.number - 1;
		}
		const path = `/pokemons/${newPokemonNumber}`;
		dispatch(loadOnePokemon(newPokemonNumber));
		navigate(path);
	};

	const handleNextClick = () => {
		let newPokemonNumber;
		if (pokemon.number === 649) {
			newPokemonNumber = 1;
		} else {
			newPokemonNumber = pokemon.number + 1;
		}
		const path = `/pokemons/${newPokemonNumber}`;
		dispatch(loadOnePokemon(newPokemonNumber));
		navigate(path);
	};

	return (
		<main className={styles.main}>
			<section className={styles.main_section}>
				<div className={styles.main_section_top}>
					<div
						className={styles.container_arrowleft}
						onClick={handlePreviousClick}>
						<i className={`${styles.arrow} ${styles.arrow_left}`}></i>
					</div>
					<div className={styles.main_section_divImg}>
						<img
							src={pokemon.picture}
							alt={`${pokemon.name}`}
							className={styles.main_section_img}
						/>
						<div
							className={styles.main_section_add}
							onClick={handleClick}
							style={{
								display: localStorage.getItem('userId') ? 'block' : 'none',
							}}></div>
					</div>
					<div
						className={styles.container_arrowright}
						onClick={handleNextClick}>
						<i className={`${styles.arrow} ${styles.arrow_right}`}></i>
					</div>
				</div>
				<div className={styles.main_section_stats}>
					<p className={styles.main_section_stats_text}>HP</p>
					<div className={styles.main_section_stats_hp}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.hp)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.hp)}`,
							}}>
							{pokemon.hp}
						</div>
					</div>
					<p className={styles.main_section_stats_text}>ATK</p>
					<div className={styles.main_section_stats_atk}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.attack)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.attack)}`,
							}}>
							{pokemon.attack}
						</div>
					</div>
					<p className={styles.main_section_stats_text}>DEF</p>
					<div className={styles.main_section_stats_def}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.defense)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.defense)}`,
							}}>
							{pokemon.defense}
						</div>
					</div>
					<p className={styles.main_section_stats_text}>ATK SPE</p>
					<div className={styles.main_section_stats_atkspe}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.attackSpe)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.attackSpe)}`,
							}}>
							{pokemon.attackSpe}
						</div>
					</div>
					<p className={styles.main_section_stats_text}>DEF SPE</p>
					<div className={styles.main_section_stats_defspe}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.defenseSpe)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.defenseSpe)}`,
							}}>
							{pokemon.defenseSpe}
						</div>
					</div>
					<p className={styles.main_section_stats_text}>SPEED</p>
					<div className={styles.main_section_stats_speed}>
						<div
							className={styles.main_section_stats_fill}
							style={{
								width: `${getStatpercentage(pokemon.speed)}%`,
								height: '100%',
								backgroundColor: `${backgroundColor(pokemon.speed)}`,
							}}>
							{pokemon.speed}
						</div>
					</div>
				</div>
			</section>
			<section
				className={styles.main_desc}
				style={{
					background: `${getTypeColor()}`,
				}}>
				<p className={styles.main_desc_name}>
					#{pokemon.number} - {pokemon.name}
				</p>
				<p className={styles.main_desc_region}>{pokemon.region}</p>
				<div className={styles.main_desc_types}>
					{!types ? (
						<div>Types loading...</div>
					) : (
						types.map((type) => {
							return (
								<div
									key={type.id}
									className={styles.main_desc_type}>
									{type.name}
								</div>
							);
						})
					)}
				</div>
			</section>
		</main>
	);
};
