import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllPokemons = createAsyncThunk(
	'pokemonBoard/loadAllPokemons',
	async (region = '') => {
		let data = [];

		if (!region) {
			data = await fetch('http://127.0.0.1/api/pokemons/');
		} else {
			data = await fetch(`http://127.0.0.1:8000/api/pokemons/region/${region}`);
		}
		const json = await data.json();
		return json;
	}
);

export const loadOnePokemon = createAsyncThunk(
	'pokemonBoard/loadOnePokemon',
	async (id) => {
		const data = await fetch(`http://127.0.0.1:8000/api/pokemons/${id}`);
		const json = await data.json();
		return json;
	}
);

export const loadFavoritePokemons = createAsyncThunk(
	'pokemonBoard/loadFavoritePokemons',
	async (userId) => {
		const data = await fetch(
			`http://127.0.0.1:8000/api/users/${userId}/favorites`
		);
		const json = await data.json();
		return json;
	}
);

export const pokemonBoardSlice = createSlice({
	name: 'pokemonBoard',
	initialState: {
		pokemons: [],
		pokemon: {},
		favoritePokemons: [],
		isLoadingPokemons: false,
		hasError: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadAllPokemons.pending, (state) => {
				state.isLoadingPokemons = true;
				state.hasError = false;
				state.pokemons = [];
			})
			.addCase(loadAllPokemons.fulfilled, (state, action) => {
				state.isLoadingPokemons = false;
				state.pokemons = [...action.payload];
				state.hasError = false;
			})
			.addCase(loadAllPokemons.rejected, (state) => {
				state.isLoadingPokemons = false;
				state.pokemons = [];
				state.hasError = true;
			})
			.addCase(loadOnePokemon.pending, (state) => {
				state.isLoadingPokemons = true;
				state.hasError = false;
				state.pokemon = [];
			})
			.addCase(loadOnePokemon.fulfilled, (state, action) => {
				state.isLoadingPokemons = false;
				state.pokemon = action.payload;
				state.hasError = false;
			})
			.addCase(loadOnePokemon.rejected, (state) => {
				state.isLoadingPokemons = false;
				state.pokemon = [];
				state.hasError = true;
			})
			.addCase(loadFavoritePokemons.pending, (state) => {
				state.isLoadingPokemons = true;
				state.favoritePokemons = [];
				state.hasError = false;
			})
			.addCase(loadFavoritePokemons.fulfilled, (state, action) => {
				state.isLoadingPokemons = false;
				state.favoritePokemons = action.payload;
				state.hasError = false;
			})
			.addCase(loadFavoritePokemons.rejected, (state) => {
				state.isLoadingPokemons = false;
				state.favoritePokemons = [];
				state.hasError = true;
			});
	},
});

export const selectAllPokemons = (state) => state.pokemonBoard.pokemons;
export const selectOnePokemon = (state) => state.pokemonBoard.pokemon;
export const selectIsLoading = (state) => state.pokemonBoard.isLoadingPokemons;
export const selectFavoritePokemons = (state) =>
	state.pokemonBoard.favoritePokemons;

export default pokemonBoardSlice.reducer;
